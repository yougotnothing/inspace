import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EventDate = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return req.headers['X-Event-Date'] ?? '';
  }
);
