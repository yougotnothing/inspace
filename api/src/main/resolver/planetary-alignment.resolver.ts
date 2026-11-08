import { PlanetaryAlignment } from 'model/planetary-alignment';
import { Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'guard/auth';
import { PlanetaryAlignmentService } from 'service/planetary-alignment';

/* eslint-disable @typescript-eslint/no-unused-vars */
@UseGuards(LocalAuthGuard)
@Resolver(of => PlanetaryAlignment)
export class PlanetaryAlignmentResolver {
  constructor(
    private readonly planetaryAlignmentService: PlanetaryAlignmentService
  ) {}

  async getPlanetaryAlignment(date: Date): Promise<PlanetaryAlignment> {
    return this.planetaryAlignmentService.getPlanetaryAlignment(date);
  }
}
