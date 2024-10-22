/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'guard/auth';
import { AuthenticatedGuard } from 'guard/authenticated';
import { HttpInterceptor } from 'interceptor/http';
import { MoonPhase, MoonPhaseInput } from 'model/moon-phase';
import { MoonPhaseService } from 'service/moon-phase';

@Resolver(of => MoonPhase)
export class MoonPhaseResolver {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  @Query(returns => MoonPhase)
  @UseInterceptors(HttpInterceptor)
  @UseGuards(GqlAuthGuard)
  async getMoonPhase(@Args('location') location: MoonPhaseInput) {
    return await this.moonPhaseService.getMoonPhase(location);
  }
}
