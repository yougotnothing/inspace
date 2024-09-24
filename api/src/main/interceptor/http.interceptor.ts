import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();

    if (req && req.url?.includes('/moon-phase')) {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new HttpException('body data required', 422);
      }
    }

    return next.handle();
  }
}
