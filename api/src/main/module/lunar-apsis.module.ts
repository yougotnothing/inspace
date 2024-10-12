import { Module } from '@nestjs/common';
import { LunarApsisResolver } from 'resolver/lunar-apsis';
import { LunarApsisService } from 'service/lunar-apsis';

@Module({
  imports: [],
  providers: [LunarApsisService, LunarApsisResolver],
})
export class LunarApsisModule {}
