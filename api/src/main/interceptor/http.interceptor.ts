import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlContext } from 'type/context';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { req } =
      GqlExecutionContext.create(context).getContext<GqlContext>();

    if (req && req.url?.includes('/moon-phase')) {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new HttpException('body data required', 422);
      }
    }

    return next.handle();
  }
}
