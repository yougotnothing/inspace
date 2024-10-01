import { Injectable } from '@nestjs/common';
import {
  FlexibleDateTime,
  SearchLunarEclipse,
  NextLunarEclipse,
} from 'astronomy-engine';
import { LunarEclipseInfo } from 'model/lunar-eclipse';

@Injectable()
export class LunarEclipseService {
  constructor() {}

  async nextLunarEclipse(date: FlexibleDateTime): Promise<LunarEclipseInfo> {
    const data = NextLunarEclipse(date);
    return {
      ...data,
    };
  }

  async searchLunarEclipse(date: FlexibleDateTime): Promise<LunarEclipseInfo> {
    const data = SearchLunarEclipse(date);
    return {
      ...data,
    };
  }
}
