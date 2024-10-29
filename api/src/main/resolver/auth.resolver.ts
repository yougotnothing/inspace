/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { LoginDtoInput } from 'model/login';
import { RegisterInput } from 'model/register';
import { Tokens } from 'model/tokens';
import { User } from 'model/user';
import { Public, Resource } from 'nest-keycloak-connect';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';
import { GqlContext } from 'type/context';

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
    @Context() context: GqlContext,
    @Args('loginDto') loginDto: LoginDtoInput
  ): Promise<Tokens> {
    return await this.authService.login(context.res, loginDto);
  }

  @Mutation(returns => String)
  async logout(@Context('req') req: Request): Promise<void> {
    return await this.authService.logout(req);
  }

  @Mutation(returns => Tokens)
  async refresh(@Context() ctx: GqlContext): Promise<Tokens> {
    return await this.authService.refresh(
      ctx.res,
      ctx.req.cookies?.['refresh_token']
    );
  }
}
