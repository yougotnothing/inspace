/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AirQuality } from 'utils/air-quality';

@InputType()
export class AirPollutionInput {
  @Field(type => Number)
  lat: number;

  @Field(type => Number)
  lon: number;
}

@ObjectType()
class Components {
  @Field(type => Number)
  co: number;

  @Field(type => Number)
  no: number;

  @Field(type => Number)
  no2: number;

  @Field(type => Number)
  o3: number;

  @Field(type => Number)
  so2: number;

  @Field(type => Number)
  pm2_5: number;

  @Field(type => Number)
  pm10: number;

  @Field(type => Number)
  nh3: number;
}

@ObjectType()
export class AirPollution {
  @Field(type => [Number])
  coords: Array<number>;

  @Field(type => Components)
  components: Components;

  @Field(type => String)
  aqi: keyof typeof AirQuality;

  @Field(type => String)
  date: string;
}
