/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DateValidationPipe } from 'pipe/date-validation';
import { LunarEclipseService } from 'service/lunar-eclipse';
import { LunarEclipseInfo } from 'model/lunar-eclipse';

@Resolver(of => LunarEclipseInfo)
export class LunarEclipseResolver {
  constructor(private readonly lunarEclipseService: LunarEclipseService) {}

  @Query(returns => LunarEclipseInfo)
  @UsePipes(DateValidationPipe)
  // @UseGuards(AuthGuard)
  async searchLunarEclipse(
    @Args('date') date: Date
  ): Promise<LunarEclipseInfo> {
    return await this.lunarEclipseService.searchLunarEclipse(date);
  }

  @Query(returns => LunarEclipseInfo)
  @UsePipes(DateValidationPipe)
  // @UseGuards(AuthGuard)
  async nextLunarEclipse(@Args('date') date: Date): Promise<LunarEclipseInfo> {
    return await this.lunarEclipseService.nextLunarEclipse(date);
  }
}