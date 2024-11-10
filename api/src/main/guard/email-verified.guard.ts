import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlContext } from 'type/context';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { req } =
      GqlExecutionContext.create(context).getContext<GqlContext>();

    if (
      req.headers['x-email-verified'] === 'false' ||
      !req.headers['x-email-verified']
    ) {
      throw new BadRequestException('user email is not verified.');
    }

    return true;
  }
}
