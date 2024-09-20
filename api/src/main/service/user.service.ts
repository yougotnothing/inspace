import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'model/user';
import { PrismaService } from 'service/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByName(name: string): Promise<User> {
    const user = this.prismaService.user.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      throw new HttpException('user is not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
