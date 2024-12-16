import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const Cookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const cookie =
      GqlExecutionContext.create(ctx).getContext<Request>().cookies;
    return data ? cookie[data] : cookie;
  }
);
