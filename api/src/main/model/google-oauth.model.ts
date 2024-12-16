import { Field, ObjectType } from '@nestjs/graphql';
import { NullableField } from '../decorator/nullable.decorator';

/* eslint-disable @typescript-eslint/no-unused-vars */
@ObjectType()
export class GoogleOAuthUser {
  @Field(type => String)
  email: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  picture: string;

  @Field(type => Boolean)
  email_verified: boolean;

  @NullableField(type => String)
  iss: string;

  @NullableField(type => String)
  azp: string;

  @NullableField(type => String)
  aud: string;

  @NullableField(type => String)
  sub: string;

  @NullableField(type => String)
  at_hash: string;

  @NullableField(type => String)
  given_name: string;

  @NullableField(type => String)
  family_name: string;

  @NullableField(type => Number)
  iat: number;

  @NullableField(type => Number)
  exp: number;
}

@ObjectType()
export class GoogleOAuth {
  @Field(type => Boolean)
  success: boolean;

  @Field(type => Boolean)
  registered: boolean;

  @Field(type => GoogleOAuthUser)
  user_info: GoogleOAuthUser;
}

@ObjectType()
export class OAuthData {
  @Field(type => GoogleOAuth)
  data: GoogleOAuth;

  @Field(type => Boolean)
  registered: boolean;
}
