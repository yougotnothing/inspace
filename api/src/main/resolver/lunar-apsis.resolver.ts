/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Hemisphere } from 'lunarphase-js';
import { LunarApsis } from 'model/lunar-apsis';
import { LunarApsisService } from 'service/lunar-apsis';

@Resolver(of => LunarApsis)
export class LunarApsisResolver {
  constructor(private readonly lunarApsisService: LunarApsisService) {}

  @Query(returns => LunarApsis)
  async getNextLunarApsis(
    @Args('date') date: Date,
    @Args('country') country: string
  ): Promise<LunarApsis> {
    return await this.lunarApsisService.nextLunarApsis(date, country);
  }

  @Query(returns => LunarApsis)
  async searchLunarApsis(
    @Args('date') date: Date,
    @Args('country') country: string
  ): Promise<LunarApsis> {
    return await this.lunarApsisService.searchLunarApsis(date, country);
  }
}
