import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Event, EventInput } from 'model/event';
import { ActionSettingsInput } from 'model/actions-settings';
import { PrismaService } from 'service/prisma';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEvent(input: EventInput): Promise<Event> {
    let event = await this.prismaService.event.findFirst({
      where: {
        description: input.description,
        date: input.date,
      },
    });

    if (event) throw new BadRequestException('event already exists');

    event = await this.prismaService.event.create({
      data: { ...input },
    });

    return event;
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.prismaService.event.findFirst({ where: { id } });

    if (!event)
      throw new HttpException('Action not found', HttpStatus.NOT_FOUND);

    return event;
  }

  async getEventByDescription(description: string): Promise<Event> {
    const event = await this.prismaService.event.findFirst({
      where: { description },
    });

    if (!event)
      throw new HttpException('Action not found', HttpStatus.NOT_FOUND);

    return event;
  }

  async getManyEventsBy(settings: ActionSettingsInput): Promise<Event[]> {
    if (!settings.description && !settings.date && !settings.type) {
      throw new HttpException(
        'At least one field (description, date, or type) must be provided.',
        HttpStatus.BAD_REQUEST
      );
    }

    const events = await this.prismaService.event.findMany({
      where: { ...settings },
    });

    if (!events.length)
      throw new HttpException('Actions not found', HttpStatus.NOT_FOUND);

    return events;
  }
}
