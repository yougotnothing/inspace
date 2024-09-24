import { Module } from '@nestjs/common';
import { ActionResolver } from 'resolver/action';
import { ActionService } from 'service/action';
import { PrismaService } from 'service/prisma';

@Module({
  imports: [],
  providers: [ActionService, ActionResolver, PrismaService],
})
export class ActionModule {}
