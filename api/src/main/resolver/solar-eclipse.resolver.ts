import { UseGuards, UsePipes } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import {
  NextSolarEclipse,
  ObserverInput,
  SearchSolarEclipse,
} from 'model/solar-eclipse';
import { DateValidationPipe } from 'pipe/date-validation';
import { SolarEclipseService } from 'service/solar-eclipse';

/* eslint-disable @typescript-eslint/no-unused-vars */
@UseGuards(LocalAuthGuard)
@Resolver(of => NextSolarEclipse)
export class SolarEclipseResolver {
  constructor(private readonly solarEclipseService: SolarEclipseService) {}

  @Query(returns => NextSolarEclipse)
  async nextGlobalSolarEclipse(
    @Args('startTime') startTime: Date
  ): Promise<NextSolarEclipse> {
    return await this.solarEclipseService.nextGlobalSolarEclipse(startTime);
  }

  @Query(returns => SearchSolarEclipse)
  async searchLocalSolarEclipse(
    @Args('startTime') startTime: Date,
    @Args('observer') observer: ObserverInput
  ): Promise<SearchSolarEclipse> {
    return await this.solarEclipseService.searchLocalSolarEclipse(
      startTime,
      observer
    );
  }

  @Query(returns => SearchSolarEclipse)
  @UsePipes(DateValidationPipe)
  async nextLocalSolarEclipse(
    @Args('startTime') startTime: Date,
    @Args('observer') observer: ObserverInput
  ) {
    return await this.solarEclipseService.nextLocalSolarEclipse(
      startTime,
      observer
    );
  }
}
