/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, Resolver } from '@nestjs/graphql';
import { User } from 'model/user';
import { Query } from '@nestjs/graphql';
import { UserService } from 'service/user';
import { GqlContext } from 'type/context';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'guard/auth';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Query(returns => User)
  async getUserByName(@Args('name') name: string): Promise<User> {
    return await this.userService.getUserByName(name);
  }

  @UseGuards(LocalAuthGuard)
  @Query(returns => User)
  async getSelf(@Context() ctx: GqlContext): Promise<User> {
    return await this.userService.getSelf(
      ctx.req.headers.authorization.split(' ')[1] ?? ''
    );
  }
}
