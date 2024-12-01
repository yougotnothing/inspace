/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Planets } from 'utils/planets';

@ObjectType()
export class PlanetaryAlignment {
  @Field(type => Date)
  date: Date;

  @Field(type => [PlanetPosition])
  positions: PlanetPosition[];
}

@ObjectType()
class PlanetPosition {
  @Field(type => String)
  planet: Planets;

  @Field(type => Number)
  x: number;

  @Field(type => Number)
  y: number;

  @Field(type => Number)
  z: number;

  @Field(type => Number)
  distance: number;
}
