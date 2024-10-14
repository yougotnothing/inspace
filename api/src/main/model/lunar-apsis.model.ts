/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { ApsisKind } from 'astronomy-engine';
import { AstroTime } from './astro-time.model';
import { LunarPhase } from 'lunarphase-js';

@ObjectType()
export class LunarApsis {
  @Field(type => Number)
  dist_au: number;

  @Field(type => Number)
  dist_km: number;

  @Field(type => AstroTime)
  time: AstroTime;

  @Field(type => String)
  kind: keyof typeof ApsisKind;

  @Field(type => String)
  phase: LunarPhase;
}
