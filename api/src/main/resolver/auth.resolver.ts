/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { LoginDtoInput } from 'model/login-dto';
import { RegisterInput } from 'model/register';
import { User } from 'model/user';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => String)
  @UsePipes(RegisterValidationPipe, EmailValidationPipe)
  async register(@Args('user') user: RegisterInput): Promise<string> {
    return await this.authService.register(user);
  }

  @Mutation(returns => String)
  async login(
    @Args('loginDto') loginDto: LoginDtoInput,
    @Context('res') res: Response
  ): Promise<string> {
    return await this.authService.login(loginDto, res);
  }

  @Mutation(returns => String)
  async logout(@Context('req') req: Request): Promise<string> {
    return await this.authService.logout(req);
  }
}
