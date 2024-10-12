/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AstroTime {
  @Field(type => Date)
  date: Date;

  @Field(type => Number)
  ut: number;

  @Field(type => Number)
  tt: number;
}
