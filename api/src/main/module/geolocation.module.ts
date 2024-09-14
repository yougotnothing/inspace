import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeolocationController } from 'controller/geolocation';
import { GeolocationService } from 'service/geolocation';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('GEO_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GeolocationService],
  controllers: [GeolocationController],
})
export class GeolocationModule {}
