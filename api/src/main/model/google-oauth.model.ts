/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class GoogleUser {
  @Field(type => String)
  iss: string;

  @Field(type => String)
  azp: string;

  @Field(type => String)
  aud: string;

  @Field(type => String)
  sub: string;

  @Field(type => String)
  email: string;

  @Field(type => Boolean)
  email_verified: boolean;

  @Field(type => String)
  at_hash: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  picture: string;

  @Field(type => String)
  given_name: string;

  @Field(type => String)
  family_name: string;

  @Field(type => Number)
  iat: number;

  @Field(type => Number)
  exp: number;
}

@ObjectType()
export class GoogleOAuth {
  @Field(type => Boolean)
  success: boolean;

  @Field(type => GoogleUser)
  user_info: GoogleUser;
}
