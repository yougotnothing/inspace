/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, Action as ActionDto } from '@prisma/client';

@ObjectType({ description: 'action' })
export class Action implements ActionDto {
  @Field(type => String)
  id: string;

  @Field(type => String)
  type: $Enums.ActionType;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  date: Date;

  @Field(type => Boolean)
  isSpotted: boolean;

  @Field(type => String)
  userId: string | null;
}
