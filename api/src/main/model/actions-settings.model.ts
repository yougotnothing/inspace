/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType()
export class ActionSettingsInput {
  @Field(type => String)
  description?: string;

  @Field(type => Date)
  date?: Date;

  @Field(type => String)
  type?: $Enums.ActionType;
}
