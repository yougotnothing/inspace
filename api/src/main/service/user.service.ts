import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from 'model/user';
import { PrismaService } from 'service/prisma';
import { RedisService } from './redis.service';
import { Message } from 'model/message';

@Injectable()
export class UserService {
  constructor(
    @Inject(RedisService)
    private readonly redisService: RedisService,
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

  async deleteUser(access_token: string): Promise<Message> {
    try {
      const { id, name } = await this.getSelf(access_token);
      const token = await this.redisService.getDeleteUser(id);

      if (!token) throw new BadRequestException('Delete user token expired');

      await this.httpService.axiosRef.delete('/openid-connect/delete-user', {
        params: { access_token },
      });
      await this.prismaService.user.delete({ where: { id } });
      await this.prismaService.event.deleteMany({ where: { userId: id } });
      await this.redisService.deleteDeleteUser(id);

      return { message: `${name}, your account has been deleted` };
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else {
        throw new HttpException('Internal server error', 500);
      }
    }
  }
}
