import { Module } from '@nestjs/common';
import { MoonPhaseController } from 'controller/moon-phase';
import { MoonPhaseService } from 'service/moon-phase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from 'interceptor/http';

@Module({
  imports: [],
  controllers: [MoonPhaseController],
  providers: [
    MoonPhaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class MoonPhaseModule {}
