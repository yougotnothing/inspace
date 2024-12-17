import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { Message } from 'model/message';
import { GoogleOAuth } from 'model/google-oauth';

@Injectable()
export class AuthService {
  constructor(
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
          createdAt: new Date().toISOString(),
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

  private async googleLogin(res: Response, email: string): Promise<Tokens> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });

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
        path: '/',
        expires: new Date(Date.now() + response.data.expires_in * 1000),
      });

      return response.data;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async login(res: Response, loginDto: LoginDtoInput): Promise<Tokens> {
    try {
      const { email, password, timezone } = await this.validateUser(loginDto);
      const tokens = await this.createTokens(res, { login: email, password });

      res.setHeader('x-user-timezone', timezone);

      return tokens;
    } catch (error) {
      throw new Error(error);
    }
  }

  async refresh(res: Response, refresh_token: string): Promise<Tokens> {
    try {
      const response = await this.httpService.axiosRef.patch(
        `/openid-connect/refresh?refresh_token=${refresh_token}`
      );

      this.setRefreshTokenCookie(
        res,
        response.data.refresh_token,
        response.data.refresh_expires_in
      );

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(req: Request): Promise<Message> {
    try {
      await this.httpService.axiosRef.post('/openid-connect/logout', {
        refresh_token: req.cookies['refresh_token'],
      });

      req.res.clearCookie('refresh_token');

      return { message: 'user logout success.' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGoogleCode(): Promise<string> {
    try {
      return (await this.httpService.axiosRef.get('/oauth/google/callback'))
        .data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGithubCode(): Promise<string> {
    try {
      return (await this.httpService.axiosRef.get('/oauth/github/callback'))
        .data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async githubAuth(res: Response, token: string): Promise<Tokens> {
    try {
      const response = await this.httpService.axiosRef
        .post(
          '/oauth/github/authorize',
          {},
          { params: { code: encodeURI(token) } }
        )
        .then(async r => {
          return await this.httpService.axiosRef.get('/oauth/github/user', {
            params: { access_token: r.data.access_token },
          });
        });
      const { name, email } = response.data;
      let user = await this.prismaService.user.findFirst({
        where: { email: response.data.email },
      });
      const date = user ? user.createdAt : new Date().toISOString();
      const password = `${date}:${response.data.email}-${response.data.name}`;

      if (!user) {
        user = await this.prismaService.user.create({
          data: {
            name,
            email,
            isVerified: true,
            password: await bcrypt.hash(password, 10),
            createdAt: new Date().toISOString(),
          },
        });

        await this.httpService.axiosRef.post('/openid-connect/register', {
          username: user.name,
          email: user.email,
          id: user.id,
          password,
        });
      }

      return Promise.resolve(
        await this.createTokens(res, { login: user.email, password })
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async googleAuth(res: Response, token: string): Promise<Tokens> {
    try {
      const response = await this.httpService.axiosRef.get<GoogleOAuth>(
        '/oauth/google',
        { params: { token: encodeURI(token) } }
      );
      let user = await this.prismaService.user.findFirst({
        where: { email: response.data.user_info.email },
      });
      const { picture, name, email } = response.data.user_info;
      const date = user ? user.createdAt : new Date().toISOString();
      const password = `${date}:${email}-${name}`;

      if (!user) {
        user = await this.prismaService.user.create({
          data: {
            name,
            email,
            avatar: picture,
            isHaveAvatar: true,
            isVerified: true,
            password: await bcrypt.hash(password, 10),
            createdAt: new Date().toISOString(),
          },
        });

        await this.httpService.axiosRef.post('/openid-connect/register', {
          username: user.name,
          email: user.email,
          id: user.id,
          password,
        });
      }

      return Promise.resolve(
        await this.createTokens(res, { login: user.email, password })
      );
    } catch (error) {
      throw new Error(error.message || 'Google Auth failed.');
    }
  }

  private async validateUser({
    login,
    password,
  }: LoginDtoInput): Promise<User> {
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
  private async createTokens(
    res: Response,
    { login, password }: LoginDtoInput
  ): Promise<Tokens> {
    try {
      const response = await this.httpService.axiosRef.post<Tokens>(
        '/openid-connect/login',
        { login, password }
      );

      this.setRefreshTokenCookie(
        res,
        response.data.refresh_token,
        response.data.refresh_expires_in
      );

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private setRefreshTokenCookie(
    res: Response,
    token: string,
    expires_in: number
  ): Response<any, Record<string, any>> {
    return res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      expires: new Date(Date.now() + expires_in * 1000),
    });
  }
}
