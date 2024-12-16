import { UsePipes } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { AirPollution, AirPollutionInput } from 'model/air-pollution';
import { AirPollutionValidationPipe } from 'pipe/air-pollution-validation';
import { AirPollutionService } from 'service/air-pollution';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver(of => AirPollution)
export class AirPollutionResolver {
  constructor(private readonly airPollutionService: AirPollutionService) {}

  @Query(returns => AirPollution)
  @UsePipes(AirPollutionValidationPipe)
  async getAirPollutionInfo(
    @Args('coords') coords: AirPollutionInput
  ): Promise<AirPollution> {
    return await this.airPollutionService.getAirPollutionInfo(coords);
  }
}
