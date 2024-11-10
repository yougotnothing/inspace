import { Module } from '@nestjs/common';
import { EventResolver } from 'resolver/event';
import { EventService } from 'service/event';
import { PrismaService } from 'service/prisma';

@Module({
  imports: [],
  providers: [EventService, EventResolver, PrismaService],
})
export class ActionModule {}
