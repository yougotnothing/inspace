/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Redis } from 'ioredis';
import { VerifyEmail } from 'model/verfiy-email';
import { EmailService } from 'service/email';

@Resolver(of => VerifyEmail)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Query(returns => VerifyEmail)
  async sendVerifyEmail(@Args('email') email: string): Promise<VerifyEmail> {
    return await this.emailService.sendVerifyEmail(email);
  }
}
