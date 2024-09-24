import { Module } from '@nestjs/common';
import { SessionResolver } from 'resolver/session';
import { PrismaService } from 'service/prisma';
import { SessionService } from 'service/session';

@Module({
  imports: [],
  providers: [SessionResolver, SessionService, PrismaService],
})
export class SessionModule {}
