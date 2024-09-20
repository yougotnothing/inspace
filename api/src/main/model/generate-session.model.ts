/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateSessionInput {
  @Field(type => String)
  name: string;

  @Field(type => String)
  id: string;
}
