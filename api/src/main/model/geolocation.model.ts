/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoordsDto } from 'dto/coords';

@InputType()
export class GeolocationInput implements CoordsDto {
  @Field(type => Number)
  latitude: number;

  @Field(type => Number)
  longitude: number;
}

@ObjectType()
export class Geolocation {
  @Field(type => String)
  placeName: string;

  @Field(type => String)
  countryName: string;
}
