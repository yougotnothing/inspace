import { Module } from '@nestjs/common';
import { UserResolver } from 'resolver/user';
import { PrismaService } from 'service/prisma';
import { UserService } from 'service/user';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
