import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from 'resolver/auth';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';
import { UserService } from 'service/user';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthController } from 'controller/auth';
import { RedisModule } from './redis.module';

@Global()
@Module({
  imports: [
    RedisModule,
    PassportModule,
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: `${configService.get<string>('GEO_URL')}/auth`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, AuthResolver, UserService],
  exports: [AuthService, HttpModule],
})
export class AuthModule {}
