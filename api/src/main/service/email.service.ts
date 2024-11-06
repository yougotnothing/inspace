import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EmailResponse as EmailResponse } from 'model/verfiy-email';
import { RedisService } from './redis.service';

@Injectable()
export class EmailService {
  private readonly FRONTEND_URL: string =
    this.configService.get<string>('FRONTEND_URL');
  private readonly EMAIL_CONTACT_ADDRESS: string =
    this.configService.get<string>('EMAIL_CONTACT_ADDRESS');

  constructor(
    @Inject(RedisService)
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async sendVerifyEmail(email: string): Promise<EmailResponse> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user)
      throw new NotFoundException(
        'Invalid email or user with this email not found'
      );

    await this.redisService.setVerifyEmail(user.id, crypto.randomUUID());
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-email',
      context: {
        name: user.name,
        frontendUrl: this.FRONTEND_URL,
        contactEmail: this.EMAIL_CONTACT_ADDRESS,
        url: `${this.FRONTEND_URL}/verify-email?u=${user.id}`,
      },
    });

    return {
      message: 'Email sent successfully',
      userEmail: email,
      userId: user.id,
      userName: user.name,
    };
  }

  async verifyEmail(userId: string): Promise<EmailResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const verifyEmailToken = await this.redisService.getVerifyEmail(userId);

    if (!verifyEmailToken)
      throw new NotFoundException('Verify email token expired or not found');

    await this.prismaService.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    await this.redisService.deleteVerifyEmail(userId);

    return {
      message: 'Email verified successfully',
      userEmail: user.email,
      userName: user.name,
      userId,
    };
  }

  async sendDeleteUserEmail(email: string): Promise<EmailResponse> {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    await this.redisService.setDeleteUser(user.id, crypto.randomUUID());

    if (!user) throw new NotFoundException('User not found');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Delete user',
      template: 'delete-user',
      context: {
        name: user.name,
        frontendUrl: this.FRONTEND_URL,
        contactEmail: this.EMAIL_CONTACT_ADDRESS,
        url: `${this.FRONTEND_URL}/delete-user?u=${await this.redisService.getDeleteUser(user.id)}`,
      },
    });

    return {
      message: 'Email sent successfully',
      userEmail: email,
      userId: user.id,
      userName: user.name,
    };
  }
}
