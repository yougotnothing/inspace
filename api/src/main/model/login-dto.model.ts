/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { UserPlatformInput } from './user-platform.model';

@InputType()
export class LoginDtoInput {
  @Field(type => String)
  login: string;

  @Field(type => String)
  password: string;

  @Field(type => UserPlatformInput)
  userPhatform: UserPlatformInput;
}
