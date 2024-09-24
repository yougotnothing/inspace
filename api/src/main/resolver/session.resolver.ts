/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GenerateSessionInput } from 'model/generate-session';
import { Session } from 'model/session';
import { SessionService } from 'service/session';

@Resolver(of => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(returns => Session)
  async generate(
    @Args('generateDto') generateDto: GenerateSessionInput,
    @Context('res') res: Response
  ) {
    return await this.sessionService.generate({ ...generateDto }, res);
  }

  @Mutation(returns => String)
  async destroy(req: Request) {
    return this.sessionService.destroy(req);
  }
}
