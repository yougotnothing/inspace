import { Module } from '@nestjs/common';
import { SolarEclipseResolver } from 'resolver/solar-eclipse';
import { SolarEclipseService } from 'service/solar-eclipse';

@Module({
  imports: [],
  providers: [SolarEclipseService, SolarEclipseResolver],
})
export class SolarEclipseModule {}
