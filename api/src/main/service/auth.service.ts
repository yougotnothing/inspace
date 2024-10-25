import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'service/prisma';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { User } from '@prisma/client';
import { validateEmailRegexp } from 'utils/validate-email';
import { LoginDtoInput } from 'model/login';
import { RegisterInput } from 'model/register';
import { HttpService } from '@nestjs/axios';
import { Tokens } from 'model/tokens';
import { Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly redisManager: Cache,
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService
  ) {}

  async register(createUserDto: RegisterInput): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prismaService.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (createUserDto.password !== createUserDto.confirmPassword)
        throw new HttpException("passwords don't match.", HttpStatus.CONFLICT);

      if (user)
        throw new HttpException('User already exists', HttpStatus.CONFLICT);

      const createdUser = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: hashedPassword,
        },
      });

      const response = await this.httpService.axiosRef.post(
        '/openid-connect/register',
        {
          username: createdUser.name,
          email: createdUser.email,
          id: createdUser.id,
          password: createdUser.password,
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async login(res: Response, loginDto: LoginDtoInput): Promise<Tokens> {
    try {
      const user = await this.validateUser(loginDto);
      const response = await this.httpService.axiosRef.post(
        '/openid-connect/login',
        {
          login: user.name,
          password: user.password,
        }
      );

      res.cookie('refresh_token', response.data.refresh_token, {
        httpOnly: true,
        secure: false,
        maxAge: response.data.expires_in * 1000,
      });

      await this.redisManager.set(
        user.id,
        response.data.access_token,
        response.data.expires_in * 1000
      );

      return response.data;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async refresh(
    res: Response,
    refreshToken: string
  ): Promise<{ message: string; session: any }> {
    try {
      const response = await this.httpService.axiosRef.patch(
        '/openid-connect/refresh',
        {
          refresh_token: refreshToken,
        }
      );

      res.cookie('refresh_token', response.data.refresh_token, {
        httpOnly: true,
        secure: false,
        maxAge: response.data.expires_in * 1000,
      });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(req: Request): Promise<void> {
    req.session.destroy(err => {
      if (err) throw err;
    });
  }

  async validateUser({ login, password }: LoginDtoInput): Promise<User> {
    const where = validateEmailRegexp.test(login)
      ? { email: login }
      : { name: login };
    const user = await this.prismaService.user.findFirst({ where });

    if (!user)
      throw new HttpException(
        `user ${login} is not found`,
        HttpStatus.BAD_REQUEST
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        "passwords don't match",
        HttpStatus.FAILED_DEPENDENCY
      );

    return user;
  }
}
