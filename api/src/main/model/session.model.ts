/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Session as SessionDto } from '@prisma/client';

@ObjectType({ description: 'session' })
export class Session implements SessionDto {
  @Field(type => String)
  userId: string;

  @Field(type => String)
  device: string;

  @Field(type => String)
  sessionId: string;
}
