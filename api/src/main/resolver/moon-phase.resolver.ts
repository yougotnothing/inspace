/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Resolver, Query } from '@nestjs/graphql';
import { MoonPhase, MoonPhaseInput } from 'model/moon-phase';
import { MoonPhaseService } from 'service/moon-phase';

@Resolver(of => MoonPhase)
export class MoonPhaseResolver {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  @Query(returns => MoonPhase)
  async getMoonPhase(@Args('location') location: MoonPhaseInput) {
    return await this.moonPhaseService.getMoonPhase(location);
  }
}
