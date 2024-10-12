/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MoonEvents {
  @Field(type => Number)
  moonDistance: number;

  @Field(type => String)
  date: string;
}
