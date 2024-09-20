import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDtoInput } from 'model/login-dto';
import { RegisterInput } from 'model/register';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new RegisterValidationPipe(), new EmailValidationPipe())
    createUserDto: RegisterInput
  ): Promise<string> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDtoInput,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<string> {
    return await this.authService.login(loginDto, request, response);
  }

  @Post('logout')
  async logout(@Req() req: Request): Promise<string> {
    return await this.authService.logout(req);
  }
}
