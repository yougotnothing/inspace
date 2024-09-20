import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'service/prisma';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { validateEmailRegexp } from 'utils/validate-email';
import { SessionService } from './session.service';
import { LoginDtoInput } from 'model/login-dto';
import { RegisterInput } from 'model/register';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sessionService: SessionService
  ) {}

  async register(createUserDto: RegisterInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException("passwords don't match.", HttpStatus.CONFLICT);
    }

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

  async login(
    loginDto: LoginDtoInput,
    req: Request,
    res: Response
  ): Promise<string> {
    const user = await this.validateUser(loginDto);
    const session = await this.sessionService.generate(
      {
        name: user.name,
        id: user.id,
      },
      req
    );

    if (!session.devices.includes(req.headers['user-agent'])) {
      await this.prismaService.session.update({
        where: {
          sessionId: session.sessionId,
        },
        data: {
          devices: [...session.devices, req.headers['user-agent']],
        },
      });
    }

    req.session['user'] = {
      name: user.name,
      id: user.id,
    };

    res.cookie('session', req.sessionID, {
      httpOnly: true,
      secure: true,
      maxAge: 360000,
      path: '/',
    });

    req.session['visits'] = session.devices.length;

    return `user ${user.name} signed in success.`;
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

  async logout(req: Request): Promise<string> {
    const user = await this.prismaService.user.findFirst({
      where: {
        Session: {
          sessionId: req.sessionID,
        },
      },
      include: {
        Session: true,
      },
    });

    if (!user) {
      throw new HttpException(
        'User not found by this session id',
        HttpStatus.BAD_REQUEST
      );
    }

    req.session.destroy(err => {
      if (err) throw err;
    });

    await this.prismaService.session.delete({
      where: {
        sessionId: req.sessionID,
      },
    });

    return `user ${user.name} logged out success.`;
  }

  async validateUser({ login, password }: LoginDtoInput): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: !validateEmailRegexp.test(login)
        ? { name: login }
        : { email: login },
    });

    if (!user) {
      throw new HttpException(
        'user in not defined (not registered)',
        HttpStatus.NO_CONTENT
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException("Passwords don't match.", HttpStatus.CONFLICT);
    }

    return user;
  }
}
