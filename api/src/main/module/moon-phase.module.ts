import { Module } from '@nestjs/common';
import { MoonPhaseService } from 'service/moon-phase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from 'interceptor/http';
import { MoonPhaseResolver } from 'resolver/moon-phase';

@Module({
  imports: [],
  providers: [
    MoonPhaseService,
    MoonPhaseResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class MoonPhaseModule {}
