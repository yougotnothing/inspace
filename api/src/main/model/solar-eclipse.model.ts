/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EclipseKind } from 'astronomy-engine';

@ObjectType()
class AstroTimeObject {
  @Field(type => Number)
  tt: number;

  @Field(type => Number)
  ut: number;

  @Field(type => Date)
  date: Date;
}

@ObjectType()
class EclipseEvent {
  @Field(type => Number)
  altitude: number;

  @Field(type => AstroTimeObject)
  time: AstroTimeObject;
}

@ObjectType()
export class SearchSolarEclipse {
  @Field(type => String)
  kind: EclipseKind;

  @Field(type => Number)
  obscuration: number;

  @Field(type => EclipseEvent)
  partial_begin: EclipseEvent;

  @Field(type => EclipseEvent, { nullable: true })
  total_begin: EclipseEvent | undefined;

  @Field(type => EclipseEvent)
  peak: EclipseEvent;

  @Field(type => EclipseEvent, { nullable: true })
  total_end: EclipseEvent | undefined;

  @Field(type => EclipseEvent)
  partial_end: EclipseEvent;
}

@ObjectType()
export class NextSolarEclipse {
  @Field(type => String)
  kind: EclipseKind;

  @Field(type => Number, { nullable: true })
  obscuration: number | undefined;

  @Field(type => AstroTimeObject)
  peak: AstroTimeObject;

  @Field(type => Number)
  distance: number;

  @Field(type => Number, { nullable: true })
  latitude?: number | undefined;

  @Field(type => Number, { nullable: true })
  longitude?: number | undefined;
}

@InputType()
export class ObserverInput {
  @Field(type => Number)
  latitude: number;

  @Field(type => Number)
  longitude: number;

  @Field(type => Number)
  height: number;
}

@InputType()
export class SolarEclipseInput {
  @Field(type => Date)
  startTime: Date;

  @Field(type => ObserverInput)
  observer: ObserverInput;
}
