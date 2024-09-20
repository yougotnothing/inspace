import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoonPhaseModule } from 'module/moon-phase';
import { GeolocationModule } from 'module/geolocation';
import { AuthModule } from 'module/auth';
import { GraphQLModule } from 'module/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    MoonPhaseModule,
    GeolocationModule,
    AuthModule,
    GraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
