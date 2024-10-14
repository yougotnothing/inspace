import { Injectable } from '@nestjs/common';
import { NextLunarApsis, SearchLunarApsis } from 'astronomy-engine';
import { LunarApsis } from 'model/lunar-apsis';
import { Moon } from 'lunarphase-js';
import { validateCountry } from 'utils/validate-country';

@Injectable()
export class LunarApsisService {
  async searchLunarApsis(date: Date, country: string): Promise<LunarApsis> {
    const promise = SearchLunarApsis(date);
    const hemisphere = validateCountry(country);

    return {
      ...promise,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
      phase: Moon.lunarPhase(promise.time.date, { hemisphere }),
    };
  }

  async nextLunarApsis(date: Date, country: string): Promise<LunarApsis> {
    const promise = NextLunarApsis(SearchLunarApsis(date));
    const hemisphere = validateCountry(country);

    return {
      ...promise,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
      phase: Moon.lunarPhase(promise.time.date, { hemisphere }),
    };
  }
}
