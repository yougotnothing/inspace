/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { VerifyEmail } from 'model/verfiy-email';
import { EmailService } from 'service/email';

@Resolver(of => VerifyEmail)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(returns => VerifyEmail)
  async sendVerifyEmail(@Args('email') email: string): Promise<VerifyEmail> {
    return await this.emailService.sendVerifyEmail(email);
  }

  @Mutation(returns => VerifyEmail)
  async verifyEmail(@Args('userId') userId: string): Promise<VerifyEmail> {
    return await this.emailService.verifyEmail(userId);
  }
}
