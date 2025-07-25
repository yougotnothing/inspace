/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MoonPhaseDto } from 'dto/moon-phase';
import { Hemisphere } from 'lunarphase-js';
import { Countries } from 'type/countries';
import { NullableField } from '../decorator/nullable.decorator';

@InputType()
export class MoonPhaseInput implements MoonPhaseDto {
  @NullableField(type => String)
  timezone: string;

  @Field(type => String)
  country: Countries;

  @Field(type => Date)
  date: Date;
}

@ObjectType()
export class MoonPhase {
  @Field(type => Number)
  distance: number;

  @Field(type => String)
  phase: string;

  @Field(type => String)
  hemisphere: Hemisphere;

  @Field(type => Number)
  declination: number;

  @Field(type => Number)
  illumination: number;

  @Field(type => Number)
  x: number;

  @Field(type => Number)
  z: number;

  @Field(type => Number)
  y: number;

  @Field(type => String)
  emoji: string;
}
