import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailService } from 'service/email';
import { EmailResolver } from 'resolver/email';
import { PrismaService } from 'service/prisma';
import { RedisModule } from 'module/redis';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    RedisModule,
    ScheduleModule.forRoot({ cronJobs: true }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        defaults: { from: 'The ☾ Inspace Team <noreply@inspace.app>' },
        template: {
          dir: join(__dirname, 'main', 'templates'),
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: { strict: true },
        },
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService, PrismaService, EmailResolver],
})
export class EmailModule {}
