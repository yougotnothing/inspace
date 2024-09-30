/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Error {
  @Field(type => String)
  message: string;

  @Field(type => Number)
  status: number;
}
