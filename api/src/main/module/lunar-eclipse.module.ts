import { Module } from '@nestjs/common';
import { LunarEclipseResolver } from 'resolver/lunar-eclipse';
import { LunarEclipseService } from 'service/lunar-eclipse';

@Module({
  imports: [],
  providers: [LunarEclipseResolver, LunarEclipseService],
})
export class LunarEclipseModule {}
