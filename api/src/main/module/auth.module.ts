import { Module } from '@nestjs/common';
import { AuthController } from 'controller/auth';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';
import { SessionService } from 'service/session';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, SessionService],
})
export class AuthModule {}
