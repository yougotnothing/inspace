/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { $Enums, User as UserDto } from '@prisma/client';

@ObjectType({ description: 'user' })
export class User implements UserDto {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  avatar: string;

  @Field(type => Boolean)
  isHaveAvatar: boolean;

  @Field(type => Boolean)
  isVerified: boolean;

  @Field(type => String)
  role: $Enums.Role;

  @Field(type => String)
  password: string;
}
