/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards, UsePipes } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { LocalAuthGuard } from 'guard/auth';
import { EmailResponse } from 'model/verfiy-email';
import { EmailValidationPipe } from 'pipe/email-validation';
import { EmailService } from 'service/email';

@Resolver(of => EmailResponse)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(returns => EmailResponse)
  @UsePipes(EmailValidationPipe)
  async sendVerifyEmail(@Args('email') email: string): Promise<EmailResponse> {
    return await this.emailService.sendVerifyEmail(email);
  }

  @Mutation(returns => EmailResponse)
  async verifyEmail(@Args('userId') userId: string): Promise<EmailResponse> {
    return await this.emailService.verifyEmail(userId);
  }

  @Mutation(returns => EmailResponse)
  @UseGuards(LocalAuthGuard)
  @UsePipes(EmailValidationPipe)
  async sendDeleteUserEmail(
    @Args('email') email: string
  ): Promise<EmailResponse> {
    return await this.emailService.sendDeleteUserEmail(email);
  }

  @Mutation(returns => EmailResponse)
  @UseGuards(LocalAuthGuard)
  async sendEventEmail(
    @Args('email') email: string,
    @Args('eventId') eventId: string
  ): Promise<EmailResponse> {
    return await this.emailService.sendEventEmail(email, eventId);
  }
}
