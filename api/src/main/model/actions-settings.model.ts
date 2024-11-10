/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class ActionSettingsInput {
  @Field(type => String, { nullable: true })
  description?: string;

  @Field(type => Date, { nullable: true })
  date?: Date;

  @Field(type => String, { nullable: true })
  type?: $Enums.EventType;
}
