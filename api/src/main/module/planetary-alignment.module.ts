import { Module } from '@nestjs/common';
import { PlanetaryAlignmentResolver } from 'resolver/planetary-alignment';
import { PlanetaryAlignmentService } from 'service/planetary-alignment';

@Module({
  imports: [],
  providers: [PlanetaryAlignmentService, PlanetaryAlignmentResolver],
})
export class PlanetaryAlignmentModule {}
