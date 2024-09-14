import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user';
import { PrismaService } from 'service/prisma';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'dto/login';
import { Request, Response } from 'express';

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
    const user =
      (await this.prismaService.user.findUnique({
        where: { email: loginDto.login },
      })) ??
      (await this.prismaService.user.findFirst({
        where: { name: loginDto.login },
      }));

    if (!user) {
      throw new HttpException(
        'user in not defined (not registered)',
        HttpStatus.NO_CONTENT
      );
    }

    req.session.save(err => {
      if (err) {
        throw new HttpException(err.message, err.status);
      }
    });

    req.session['user'] = {
      name: user.name,
      id: user.id,
    };

    res.cookie('sid', req.sessionID);

    return {
      message: `user ${user.name} signed in success.`,
    };
  }
}
