import { Controller, Patch, Res } from '@nestjs/common';
import { AuthService } from 'service/auth';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('openid-connect/refresh')
  async refreshToken(@Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(
      res,
      res.req.cookies?.['refresh_token']
    );
  }
}
