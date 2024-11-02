import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { VerifyEmail } from 'model/verfiy-email';

import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
@Injectable()
export class EmailService {
  private readonly FRONTEND_URL: string =
    this.configService.get<string>('FRONTEND_URL');
  private readonly EMAIL_CONTACT_ADDRESS: string =
    this.configService.get<string>('EMAIL_CONTACT_ADDRESS');

  constructor(
    @Inject('REDIS')
    private readonly redis: ClientProxy,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async sendVerifyEmail(email: string): Promise<VerifyEmail> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user)
      throw new NotFoundException(
        'Invalid email or user with this email not found'
      );

    const token = crypto.randomUUID();
    this.redis
      .emit(`${user.id}:verify-email-token`, token)
      .pipe(timeout(100000))
      .subscribe();

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-email',
      context: {
        url: `${this.FRONTEND_URL}/verify-email?token=${token}`,
        name: user.name,
        contactEmail: this.EMAIL_CONTACT_ADDRESS,
      },
    });

    return {
      message: 'Email sent successfully',
      userEmail: email,
      userId: user.id,
    };
  }
}
