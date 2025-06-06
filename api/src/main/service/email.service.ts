import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from '@nestjs/schedule/node_modules/cron/dist/job';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import { EmailResponse as EmailResponse } from 'model/verfiy-email';
import { PrismaService } from 'service/prisma';
import { RedisService } from 'service/redis';

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
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry
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

  async sendEventEmail(email: string, eventId: string): Promise<EmailResponse> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user) throw new NotFoundException('user not found.');

    const event = await this.prismaService.event.findFirst({
      where: { id: eventId },
    });

    const eventType = event.type
      .toLowerCase()
      .split('_')
      .map(word => word[0].toUpperCase + word.slice(1))
      .join(' ');

    const date = dayjs(event.date).subtract(1, 'hour').toDate();
    const job = new CronJob(date, () => {
      this.mailerService.sendMail({
        to: user.email,
        subject: `Hurry up, ${eventType} is comming!`,
        template: 'event',
        context: {
          user: user.name,
          message: `${eventType} starts in a hour, dont miss it!`,
          frontendUrl: this.FRONTEND_URL,
          email: this.EMAIL_CONTACT_ADDRESS,
          description: [
            `${eventType}, ${event.date.toUTCString()}`,
            event.description,
          ],
        },
      });
    });

    this.schedulerRegistry.addCronJob(`${event.type}-${date}`, job);
    job.start();

    return {
      message: 'success.',
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
    };
  }
}
