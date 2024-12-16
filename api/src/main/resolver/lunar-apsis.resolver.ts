import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import { LunarApsis, LunarApsisInput } from 'model/lunar-apsis';
import { LunarApsisService } from 'service/lunar-apsis';

/* eslint-disable @typescript-eslint/no-unused-vars */
@UseGuards(LocalAuthGuard)
@Resolver(of => LunarApsis)
export class LunarApsisResolver {
  constructor(private readonly lunarApsisService: LunarApsisService) {}

  @Query(returns => LunarApsis)
  async getNextLunarApsis(
    @Args('data') data: LunarApsisInput
  ): Promise<LunarApsis> {
    return await this.lunarApsisService.nextLunarApsis(data);
  }

  @Query(returns => LunarApsis)
  async searchLunarApsis(
    @Args('data') data: LunarApsisInput
  ): Promise<LunarApsis> {
    return await this.lunarApsisService.searchLunarApsis(data);
  }
}
