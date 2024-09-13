import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoonPhaseModule } from 'module/moon-phase';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    MoonPhaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
