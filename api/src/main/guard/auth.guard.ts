import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { Tokens } from 'model/tokens';
import { GqlContext } from 'type/context';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  executeContext(context: ExecutionContext): GqlContext {
    return GqlExecutionContext.create(context).getContext<GqlContext>();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = this.executeContext(context);

    try {
      const userInfo = await this.getUserInfo(this.executeToken(req));

      if (userInfo.status === 200) return true;
    } catch (error) {
      throw new UnauthorizedException(error.response.data);
    }
  }

  private async getUserInfo(
    access_token: string
  ): Promise<AxiosResponse<Tokens>> {
    try {
      const response = await this.httpService.axiosRef.get<Tokens>(
        '/openid-connect/userinfo',
        {
          params: {
            access_token,
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  private executeToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
