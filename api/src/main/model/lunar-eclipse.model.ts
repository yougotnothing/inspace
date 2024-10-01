/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EclipseKind } from 'astronomy-engine';

@ObjectType()
class AstroTime {
  @Field(type => Date)
  date: Date;

  @Field(type => Number)
  ut: number;

  @Field(type => Number)
  tt: number;
}

@ObjectType()
export class LunarEclipseInfo {
  @Field(type => String)
  kind: EclipseKind;

  @Field(type => Number)
  obscuration: number;

  @Field(type => AstroTime)
  peak: AstroTime;

  @Field(type => Number)
  sd_penum: number;

  @Field(type => Number)
  sd_partial: number;

  @Field(type => Number)
  sd_total: number;
}

@InputType()
export class LunarEclipseInput {
  @Field(type => Date)
  date: Date;
}
