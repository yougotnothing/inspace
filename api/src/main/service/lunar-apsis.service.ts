import { Injectable } from '@nestjs/common';
import { Apsis, NextLunarApsis, SearchLunarApsis } from 'astronomy-engine';

@Injectable()
export class LunarApsisService {
  private searchLunarApsis(date: Date): Apsis {
    return SearchLunarApsis(date);
  }

  async nextLunarApsis(date: Date): Promise<any> {
    return NextLunarApsis(this.searchLunarApsis(date));
  }
}
