/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Planets } from 'utils/planets';

@ObjectType()
export class PlanetPosition {
  @Field(type => String)
  planet: Planets;

  @Field(type => String)
  x: number;

  @Field(type => String)
  y: number;

  @Field(type => String)
  z: number;

  @Field(type => String)
  distance: number;
}
