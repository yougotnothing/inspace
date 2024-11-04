import { Injectable } from '@nestjs/common';
import { NextLunarApsis, SearchLunarApsis } from 'astronomy-engine';
import { LunarApsis, LunarApsisInput } from 'model/lunar-apsis';
import { Moon } from 'lunarphase-js';
import { validateCountry } from 'utils/validate-country';

@Injectable()
export class LunarApsisService {
  async searchLunarApsis({
    date,
    country,
    distance,
  }: LunarApsisInput): Promise<LunarApsis> {
    const promise = SearchLunarApsis(date);
    const hemisphere = validateCountry(country);
    const moonDistance = distance === 'AU' ? promise.dist_au : promise.dist_km;

    return {
      time: promise.time,
      distance: moonDistance,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
      phase: Moon.lunarPhase(promise.time.date, { hemisphere }),
    };
  }

  async nextLunarApsis({
    date,
    country,
    distance,
  }: LunarApsisInput): Promise<LunarApsis> {
    const promise = NextLunarApsis(SearchLunarApsis(date));
    const hemisphere = validateCountry(country);
    const moonDistance = distance === 'AU' ? promise.dist_au : promise.dist_km;

    return {
      time: promise.time,
      distance: moonDistance,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
      phase: Moon.lunarPhase(promise.time.date, { hemisphere }),
    };
  }
}
