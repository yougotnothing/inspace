/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { $Enums, Event as EventDto } from '@prisma/client';

@ObjectType()
export class Event implements EventDto {
  @Field(type => String)
  id: string;

  @Field(type => String)
  type: $Enums.EventType;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  date: Date;

  @Field(type => Boolean)
  isSpotted: boolean;

  @Field(type => String)
  userId: string | null;
}

@InputType()
export class EventInput {
  @Field(type => String)
  type: $Enums.EventType;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  date: Date;

  @Field(type => String)
  userId: string;
}
