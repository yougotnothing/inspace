import { Module } from '@nestjs/common';
import { AuthResolver } from 'resolver/auth';
import { AuthService } from 'service/auth';
import { PrismaService } from 'service/prisma';
import { SessionService } from 'service/session';

@Module({
  imports: [],
  providers: [PrismaService, AuthService, SessionService, AuthResolver],
})
export class AuthModule {}
