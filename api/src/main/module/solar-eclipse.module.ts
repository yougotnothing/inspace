import { Module } from '@nestjs/common';
import {
  GlobalSolarEclipseResolver,
  LocalSolarEclipseResolver,
} from 'resolver/solar-eclipse';
import { SolarEclipseService } from 'service/solar-eclipse';

@Module({
  imports: [],
  providers: [
    SolarEclipseService,
    GlobalSolarEclipseResolver,
    LocalSolarEclipseResolver,
  ],
})
export class SolarEclipseModule {}
