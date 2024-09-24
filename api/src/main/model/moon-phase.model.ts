/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MoonPhaseDto } from 'dto/moon-phase';
import { Countries } from 'type/countries';

@InputType()
export class MoonPhaseInput implements MoonPhaseDto {
  @Field(type => String)
  country: Countries;

  @Field(type => Date)
  date: Date;
}

@ObjectType()
export class MoonPhase {
  @Field(type => String)
  phase: string;

  @Field(type => Number)
  age: number;

  @Field(type => String)
  hemisphere: string;
}
