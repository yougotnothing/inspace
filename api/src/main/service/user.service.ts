import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'model/user';
import { PrismaService } from 'service/prisma';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByName(name: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { name } });

    if (!user) {
      throw new HttpException('user is not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getSelf(access_token: string): Promise<User> {
    try {
      const response = await this.httpService.axiosRef.get(
        '/openid-connect/userinfo',
        {
          params: {
            access_token,
          },
        }
      );

      const user = await this.prismaService.user.findFirst({
        where: { name: response.data.preferred_username },
        include: { toSpotted: true },
      });

      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
