/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BrandInput {
  @Field(type => String)
  version: string;

  @Field(type => String)
  brand: string;
}

@InputType()
export class UserPlatformInput {
  @Field(type => [BrandInput])
  brands: BrandInput[];

  @Field(type => Boolean)
  mobile: boolean;

  @Field(type => String)
  platform: string;
}
