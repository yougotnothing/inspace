import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { MoonPhaseController } from 'controller/moon-phase';
import { MoonPhaseService } from 'service/moon-phase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from 'interceptor/http';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        withCredentials: true,
      }),
      inject: [ConfigService],
    }),
  ],
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
