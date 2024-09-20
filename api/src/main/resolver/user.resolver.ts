/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Resolver } from '@nestjs/graphql';
import { User } from 'model/user';
import { Query } from '@nestjs/graphql';
import { UserService } from 'service/user';

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
}
