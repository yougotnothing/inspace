/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NearestBodies {
  @Field(type => String)
  des: string;

  @Field(type => String)
  orbit_id: string;

  @Field(type => String)
  jd: string;

  @Field(type => String)
  cd: string;

  @Field(type => String)
  dist: string;

  @Field(type => String)
  dist_min: string;

  @Field(type => String)
  dist_max: string;

  @Field(type => String)
  v_rel: string;

  @Field(type => String)
  v_inf: string;

  @Field(type => String)
  t_sigma_f: string;

  @Field(type => String)
  h: string;

  @Field(type => String, { nullable: true })
  diameter: string | null;

  @Field(type => String, { nullable: true })
  diameter_sigma: string | null;

  @Field(type => String, { nullable: true })
  fullname: string | null;
}

@InputType()
export class NearestBodiesInput {
  @Field(type => String)
  distance_in: 'KM' | 'AU';

  @Field(type => Number)
  limit_from: number;
}
