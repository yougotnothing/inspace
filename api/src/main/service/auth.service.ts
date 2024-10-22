import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'service/prisma';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { User } from '@prisma/client';
import { validateEmailRegexp } from 'utils/validate-email';
import { LoginDtoInput } from 'model/login';
import { RegisterInput } from 'model/register';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async register(createUserDto: RegisterInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (createUserDto.password !== createUserDto.confirmPassword)
      throw new HttpException("passwords don't match.", HttpStatus.CONFLICT);

    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
      },
    });

    return `user ${createUserDto.name} created success.`;
  }

  async login(loginDto: LoginDtoInput): Promise<void> {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new HttpException(
        `user ${loginDto.login} is not found.`,
        HttpStatus.NOT_FOUND
      );
    }

    return;
  }

  async refresh(req: Request): Promise<{ message: string; session: any }> {
    req.session.regenerate(err => {
      if (err) throw err;
    });

    return {
      message: 'session refreshed',
      session: req.session,
    };
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

    if (!user) {
      throw new HttpException(
        `user ${login} is not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        "passwords don't match",
        HttpStatus.FAILED_DEPENDENCY
      );
    }

    return user;
  }
}
