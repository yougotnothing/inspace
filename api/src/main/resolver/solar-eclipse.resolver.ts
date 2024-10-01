/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  NextSolarEclipse,
  ObserverInput,
  SearchSolarEclipse,
  SolarEclipseInput,
} from 'model/solar-eclipse';
import { DateValidationPipe } from 'pipe/date-validation';
import { SolarEclipseService } from 'service/solar-eclipse';

@Resolver(of => NextSolarEclipse)
export class GlobalSolarEclipseResolver {
  constructor(private readonly solarEclipseService: SolarEclipseService) {}

  @Query(returns => NextSolarEclipse)
  // @UsePipes(DateValidationPipe)
  async nextGlobalSolarEclipse(
    @Args('startTime') startTime: Date
  ): Promise<NextSolarEclipse> {
    return await this.solarEclipseService.nextGlobalSolarEclipse(startTime);
  }
}

@Resolver(of => SearchSolarEclipse)
export class LocalSolarEclipseResolver {
  constructor(private readonly solarEclipseService: SolarEclipseService) {}

  @Query(returns => SearchSolarEclipse)
  @UsePipes(DateValidationPipe)
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
