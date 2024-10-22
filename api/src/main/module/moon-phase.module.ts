import { Module } from '@nestjs/common';
import { MoonPhaseService } from 'service/moon-phase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from 'interceptor/http';
import { MoonPhaseResolver } from 'resolver/moon-phase';
import { PrismaService } from 'service/prisma';

@Module({
  imports: [],
  providers: [
    MoonPhaseService,
    MoonPhaseResolver,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class MoonPhaseModule {}
