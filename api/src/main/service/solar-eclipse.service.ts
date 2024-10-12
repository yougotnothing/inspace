import { Injectable } from '@nestjs/common';
import {
  FlexibleDateTime,
  NextGlobalSolarEclipse,
  NextLocalSolarEclipse,
  Observer,
  SearchGlobalSolarEclipse,
  SearchLocalSolarEclipse,
} from 'astronomy-engine';
import {
  NextSolarEclipse,
  ObserverInput,
  SearchSolarEclipse,
} from 'model/solar-eclipse';

@Injectable()
export class SolarEclipseService {
  async searchLocalSolarEclipse(
    startTime: FlexibleDateTime,
    { latitude, longitude, height }: ObserverInput
  ): Promise<SearchSolarEclipse> {
    return SearchLocalSolarEclipse(
      startTime,
      new Observer(latitude, longitude, height)
    );
  }

  async nextLocalSolarEclipse(
    startTime: Date,
    { latitude, longitude, height }: ObserverInput
  ): Promise<SearchSolarEclipse> {
    return NextLocalSolarEclipse(
      startTime,
      new Observer(latitude, longitude, height)
    );
  }

  async nextGlobalSolarEclipse(startTime: Date): Promise<NextSolarEclipse> {
    return NextGlobalSolarEclipse(SearchGlobalSolarEclipse(startTime).peak);
  }
}
