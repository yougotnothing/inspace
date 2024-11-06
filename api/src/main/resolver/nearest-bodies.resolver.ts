/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import { NearestBodies, NearestBodiesInput } from 'model/nearest-bodies';
import { NearestBodiesService } from 'service/nearest-bodies';

@UseGuards(LocalAuthGuard)
@Resolver(of => NearestBodies)
export class NearestBodiesResolver {
  constructor(private readonly nearestBodiesService: NearestBodiesService) {}

  @Query(returns => [NearestBodies])
  async getNearestAsteroids(
    @Args('data') data: NearestBodiesInput
  ): Promise<NearestBodies[]> {
    return this.nearestBodiesService.getNearestAsteroids(data);
  }

  @Query(returns => [NearestBodies])
  async getNearestComets(
    @Args('data') data: NearestBodiesInput
  ): Promise<NearestBodies[]> {
    return this.nearestBodiesService.getNearestComets(data);
  }
}
