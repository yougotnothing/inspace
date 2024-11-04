/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApsisKind } from 'astronomy-engine';
import { AstroTime } from './astro-time.model';
import { LunarPhase } from 'lunarphase-js';
import { $Enums } from '@prisma/client';

@ObjectType()
export class LunarApsis {
  @Field(type => AstroTime)
  time: AstroTime;

  @Field(type => String)
  kind: keyof typeof ApsisKind;

  @Field(type => String)
  phase: LunarPhase;

  @Field(type => Number)
  distance: number;
}

@InputType()
export class LunarApsisInput {
  @Field(type => Date)
  date: Date;

  @Field(type => String)
  country: string;

  @Field(type => String)
  distance: $Enums.Distance;
}
