/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import { ChangeAvatar } from 'model/change-avatar';
import { UserAvatarService } from 'service/user-avatar';

@Resolver(of => ChangeAvatar)
export class UserAvatarResolver {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(returns => ChangeAvatar)
  async changeAvatar(@Args('image') image: string, @Args('id') id: string) {
    return await this.userAvatarService.changeAvatar(image, id);
  }
}
