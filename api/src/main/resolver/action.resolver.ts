/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { Action } from 'model/action';
import { ActionSettingsInput } from 'model/actions-settings';
import { ActionService } from 'service/action';

@Resolver(of => Action)
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}

  @Query(returns => Action)
  async getActionById(@Args('id') id: string): Promise<Action> {
    return await this.actionService.getActionById(id);
  }

  @Query(returns => Action)
  async getActionByDescription(
    @Args('description') description: string
  ): Promise<Action> {
    return await this.actionService.getActionByDescription(description);
  }

  @Query(returns => [Action])
  async getActionsBy(
    @Args('settings') settings: ActionSettingsInput
  ): Promise<Action[]> {
    return await this.actionService.getManyActionsBy(settings);
  }
}
