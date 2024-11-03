/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyEmail {
  @Field(type => String)
  message: string;

  @Field(type => String)
  userEmail: string;

  @Field(type => String)
  userId: string;

  @Field(type => String)
  userName: string;
}
