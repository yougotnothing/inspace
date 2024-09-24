/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { LoginDto } from 'dto/login';

@InputType()
export class LoginDtoInput implements LoginDto {
  @Field(type => String)
  login: string;

  @Field(type => String)
  password: string;
}
