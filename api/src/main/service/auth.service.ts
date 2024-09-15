import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user';
import { PrismaService } from 'service/prisma';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'dto/login';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { validateEmailRegexp } from 'utils/validate-email';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
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

    return {
      message: `user ${createUserDto.name} created success.`,
    };
  }

  async login(
    loginDto: LoginDto,
    req: Request,
    res: Response
  ): Promise<{ message: string }> {
    const user = await this.validateUser(loginDto);

    req.session['user'] = {
      name: user.name,
      id: user.id,
    };

    res.cookie('sid', req.sessionID, {
      httpOnly: true,
      secure: true,
      maxAge: 360000,
      path: '/',
    });

    if (req.session['visits']) {
      req.session['visits']++;
    } else {
      req.session['visits'] = 1;
    }

    return {
      message: `user ${user.name} signed in success.`,
    };
  }

  async logout(req: Request): Promise<{ message: string }> {
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

    return {
      message: `user ${user.name} logged out success.`,
    };
  }

  async validateUser({ login, password }: LoginDto): Promise<User> {
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
