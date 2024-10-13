import { Injectable } from '@nestjs/common';
import { NextLunarApsis, SearchLunarApsis } from 'astronomy-engine';
import { LunarApsis } from 'model/lunar-apsis';

@Injectable()
export class LunarApsisService {
  async searchLunarApsis(date: Date): Promise<LunarApsis> {
    const promise = SearchLunarApsis(date);
    return {
      ...promise,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
    };
  }

  async nextLunarApsis(date: Date): Promise<LunarApsis> {
    const promise = NextLunarApsis(SearchLunarApsis(date));
    return {
      ...promise,
      kind: promise.kind ? 'Apocenter' : 'Pericenter',
    };
  }
}
