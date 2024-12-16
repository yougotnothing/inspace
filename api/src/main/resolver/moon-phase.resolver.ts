import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import { HttpInterceptor } from 'interceptor/http';
import { MoonPhase, MoonPhaseInput } from 'model/moon-phase';
import { MoonPhaseService } from 'service/moon-phase';

/* eslint-disable @typescript-eslint/no-unused-vars */
@UseGuards(LocalAuthGuard)
@Resolver(of => MoonPhase)
export class MoonPhaseResolver {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  @Query(returns => MoonPhase)
  @UseInterceptors(HttpInterceptor)
  async getMoonPhase(@Args('location') location: MoonPhaseInput) {
    return await this.moonPhaseService.getMoonPhase(location);
  }
}
