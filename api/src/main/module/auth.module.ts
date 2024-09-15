import { Module } from '@nestjs/common';
import { AuthController } from 'controller/auth';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
