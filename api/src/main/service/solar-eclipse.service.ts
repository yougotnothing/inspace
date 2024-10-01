import { Injectable } from '@nestjs/common';
import {
  FlexibleDateTime,
  NextGlobalSolarEclipse,
  NextLocalSolarEclipse,
  Observer,
  SearchGlobalSolarEclipse,
  SearchLocalSolarEclipse,
} from 'astronomy-engine';
import { NextSolarEclipse, SearchSolarEclipse } from 'model/solar-eclipse';

@Injectable()
export class SolarEclipseService {
  async searchLocalSolarEclipse(
    startTime: FlexibleDateTime,
    observer: Observer
  ): Promise<SearchSolarEclipse> {
    return {
      ...SearchLocalSolarEclipse(startTime, observer),
    };
  }

  async nextLocalSolarEclipse(
    startTime: Date,
    observer: Observer
  ): Promise<SearchSolarEclipse> {
    return {
      ...NextLocalSolarEclipse(startTime, observer),
    };
  }

  async nextGlobalSolarEclipse(startTime: Date): Promise<NextSolarEclipse> {
    return {
      ...NextGlobalSolarEclipse(SearchGlobalSolarEclipse(startTime).peak),
    };
  }
}
