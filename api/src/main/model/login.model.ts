/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { LoginDto } from 'dto/login';

@InputType()
export class LoginDtoInput implements LoginDto {
  @Field(type => String)
  login: string;

  @Field(type => String)
  password: string;
}

@ObjectType()
export class Login {
  @Field(type => String, { nullable: true })
  sessionId?: string;

  @Field(type => String, { nullable: true })
  userId?: string;

  @Field(type => String)
  message: string;

  @Field(type => String, { nullable: true })
  device?: string;
}

@ObjectType()
export class LoginError {
  @Field(type => String)
  message: string;
}
