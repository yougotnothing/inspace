/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'dto/create-user';
import { LoginDto } from 'dto/login';
import { Request, Response } from 'express';
import { LoginDtoInput } from 'model/login-dto';
import { RegisterInput } from 'model/register';
import { User } from 'model/user';
import { AuthService } from 'service/auth';

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => String)
  async register(user: RegisterInput): Promise<string> {
    return await this.authService.register(user);
  }

  @Mutation(returns => String)
  async login(
    @Args('loginDto') loginDto: LoginDtoInput,
    res: Response,
    req: Request
  ): Promise<string> {
    return await this.authService.login(loginDto, req, res);
  }

  @Mutation(returns => String)
  async logout(req: Request): Promise<string> {
    return await this.authService.logout(req);
  }
}
