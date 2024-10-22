import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from 'resolver/auth';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';
import { UserService } from 'service/user';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [PrismaService, AuthService, AuthResolver, UserService],
})
export class AuthModule {}
