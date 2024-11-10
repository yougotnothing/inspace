/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { $Enums, User as UserDto } from '@prisma/client';
import { Event } from './event.model';

@ObjectType()
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

  @Field(type => [Event])
  toSpotted?: Event[];

  @Field(type => Number)
  spottedLunarEclipses: number;

  @Field(type => Number)
  spottedSolarEclipses: number;

  @Field(type => Number)
  spottedMeteorShowers: number;

  @Field(type => Number)
  spottedSupermoons: number;

  @Field(type => Number)
  spottedMicromoons: number;

  @Field(type => Number)
  spottedPlanetaryAlignments: number;

  @Field(type => String)
  timezone: string;

  @Field(type => String)
  shownDistance: $Enums.Distance;
}
