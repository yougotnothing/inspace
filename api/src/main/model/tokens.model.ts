/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field(type => String)
  access_token: string;

  @Field(type => String)
  refresh_token: string;

  @Field(type => Number)
  expires_in: number;

  @Field(type => Number)
  refresh_expires_in: number;

  @Field(type => String)
  session_state: string;
}
