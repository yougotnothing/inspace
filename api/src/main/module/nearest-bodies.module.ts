import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NearestBodiesResolver } from 'resolver/nearest-bodies';
import { NearestBodiesService } from 'service/nearest-bodies';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('NASA_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NearestBodiesResolver, NearestBodiesService],
})
export class NearestBodiesModule {}
