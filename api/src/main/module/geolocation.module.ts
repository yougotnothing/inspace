import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeolocationResolver } from 'resolver/geolocation';
import { GeolocationService } from 'service/geolocation';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: `${configService.get<string>('GEO_URL')}/geolocation`,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GeolocationService, GeolocationResolver],
})
export class GeolocationModule {}
