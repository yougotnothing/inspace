import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AirPollutionResolver } from 'resolver/air-pollution';
import { AirPollutionService } from 'service/air-pollution';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('AIR_POLLUTION_API_URL'),
        params: {
          appid: configService.get<string>('AIR_POLLUTION_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AirPollutionService, AirPollutionResolver],
})
export class AirPollutionModule {}
