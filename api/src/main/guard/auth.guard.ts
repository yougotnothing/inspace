import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  override getRequest = (context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req as Request;

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = await this.extractToken(this.getRequest(context));

    if (!token.length) throw new UnauthorizedException();

    return true;
  }

  private async extractToken(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }
}
