/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { GenerateSessionInput } from 'model/generate-session';
import { Session } from 'model/session';
import { SessionService } from 'service/session';

@Resolver(of => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(returns => Session)
  async generate(
    @Args('generateDto') generateDto: GenerateSessionInput,
    req: Request
  ) {
    return await this.sessionService.generate({ ...generateDto }, req);
  }

  @Mutation(returns => String)
  async destroy(req: Request) {
    return this.sessionService.destroy(req);
  }
}
