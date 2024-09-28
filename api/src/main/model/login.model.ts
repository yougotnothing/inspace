/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { LoginDto } from 'dto/login';
import { Session } from './session.model';

@InputType()
export class LoginDtoInput implements LoginDto {
  @Field(type => String)
  login: string;

  @Field(type => String)
  password: string;
}

@ObjectType()
export class Login extends Session {
  @Field(type => String)
  sessionId: string;

  @Field(type => String)
  userId: string;

  @Field(type => String)
  message: string;

  @Field(type => String)
  device: string;
}

@ObjectType()
export class LoginError {
  @Field(type => String)
  message: string;
}
