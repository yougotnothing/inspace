import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EventDate = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest<Request>().headers['X-Event-Date'] ?? ''
);
