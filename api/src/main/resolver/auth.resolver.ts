/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Scope, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { LoginDtoInput, LoginError } from 'model/login';
import { RegisterInput } from 'model/register';
import { Tokens } from 'model/tokens';
import { User } from 'model/user';
import { Public, Resource, Roles, Scopes } from 'nest-keycloak-connect';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';

@Resource('user')
@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(returns => String)
  @UsePipes(RegisterValidationPipe, EmailValidationPipe)
  async register(@Args('user') user: RegisterInput): Promise<string> {
    return await this.authService.register(user);
  }

  @Public()
  @Mutation(returns => Tokens)
  async login(
    @Context('res') res: Response,
    @Args('loginDto') loginDto: LoginDtoInput
  ): Promise<Tokens> {
    return await this.authService.login(res, loginDto);
  }

  @Mutation(returns => String)
  async logout(@Context('req') req: Request): Promise<void> {
    return await this.authService.logout(req);
  }
}
