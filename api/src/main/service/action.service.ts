import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Action } from 'model/action';
import { ActionSettingsInput } from 'model/actions-settings';
import { PrismaService } from 'service/prisma';

@Injectable()
export class ActionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActionById(id: string): Promise<Action> {
    const action = await this.prismaService.action.findFirst({
      where: {
        id,
      },
    });

    if (!action) {
      throw new HttpException('Action not found', HttpStatus.NOT_FOUND);
    }

    return action;
  }

  async getActionByDescription(description: string): Promise<Action> {
    const action = await this.prismaService.action.findFirst({
      where: {
        description,
      },
    });

    if (!action) {
      throw new HttpException('Action not found', HttpStatus.NOT_FOUND);
    }

    return action;
  }

  async getManyActionsBy(settings: ActionSettingsInput): Promise<Action[]> {
    if (!settings.description && !settings.date && !settings.type) {
      throw new HttpException(
        'At least one field (description, date, or type) must be provided.',
        HttpStatus.BAD_REQUEST
      );
    }

    const actions = await this.prismaService.action.findMany({
      where: {
        ...settings,
      },
    });

    if (!actions.length) {
      throw new HttpException('Actions not found', HttpStatus.NOT_FOUND);
    }

    return actions;
  }
}
