import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('keycloak') {
  override getRequest = (context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req;
}
