import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user';
import { LoginDto } from 'dto/login';
import { Request, Response } from 'express';
import { EmailValidationPipe } from 'pipe/email-validation';
import { RegisterValidationPipe } from 'pipe/register-validation';
import { AuthService } from 'service/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new RegisterValidationPipe(), new EmailValidationPipe())
    createUserDto: CreateUserDto
  ): Promise<{ message: string }> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ message: string }> {
    return await this.authService.login(loginDto, request, response);
  }
}
