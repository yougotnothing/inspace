/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { GqlAuthGuard } from 'guard/auth';
import { ChangeAvatar } from 'model/change-avatar';
import { UserAvatarService } from 'service/user-avatar';

@Resolver(of => ChangeAvatar)
export class UserAvatarResolver {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @Mutation(returns => ChangeAvatar)
  async changeAvatar(
    @Args('image') image: string,
    @Context('req') req: Request
  ) {
    return await this.userAvatarService.changeAvatar(image, req);
  }
}
