import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthController } from 'controller/auth';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: RegisterValidationPipe,
    },
    {
      provide: APP_PIPE,
      useClass: EmailValidationPipe,
    },
  ],
})
export class AuthModule {}
