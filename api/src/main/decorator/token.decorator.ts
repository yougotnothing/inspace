import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const Token = createParamDecorator(
  (_, context: ExecutionContext) =>
    (GqlExecutionContext.create(context).getContext().req as Request).headers[
      'authorization'
    ]?.split(' ')[1]
);
