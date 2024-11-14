/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event, EventInput } from 'model/event';
import { ActionSettingsInput } from 'model/actions-settings';
import { EventService } from 'service/event';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'guard/auth';
import { EmailVerifiedGuard } from 'guard/email-verified';

@Resolver(of => Event)
@UseGuards(LocalAuthGuard, EmailVerifiedGuard)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(returns => Event)
  async getEventById(@Args('id') id: string): Promise<Event> {
    return await this.eventService.getEventById(id);
  }

  @Query(returns => Event)
  async getEventByDescription(
    @Args('description') description: string
  ): Promise<Event> {
    return await this.eventService.getEventByDescription(description);
  }

  @Query(returns => [Event])
  async getEventsBy(
    @Args('settings') settings: ActionSettingsInput
  ): Promise<Event[]> {
    return await this.eventService.getManyEventsBy(settings);
  }

  @Mutation(returns => Event)
  async createEvent(@Args('event') event: EventInput): Promise<Event> {
    return await this.eventService.createEvent(event);
  }
}
