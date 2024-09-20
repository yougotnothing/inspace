import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Request } from 'express';
import { Session } from 'model/session';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async generate(
    user: { name: string; id: string },
    req: Request
  ): Promise<Session> {
    const session = req.sessionID
      ? await this.prismaService.session.findFirst({
          where: {
            sessionId: req.sessionID,
          },
        })
      : await this.prismaService.session.create({
          data: {
            sessionId: req.sessionID,
            userId: user.id,
          },
        });

    if (!session.devices.includes(req.headers['user-agent'])) {
      await this.prismaService.session.update({
        where: {
          sessionId: session.sessionId,
        },
        data: {
          devices: [...session.devices, req.headers['user-agent']],
        },
      });
    }

    req.session['visits'] = session.devices.length;

    return session;
  }

  async destroy(req: Request): Promise<string> {
    const session =
      req.sessionID &&
      (await this.prismaService.session.findFirst({
        where: {
          sessionId: req.sessionID,
        },
      }));

    if (!session) {
      throw new HttpException('session is not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.session.delete({
      where: {
        id: session.id,
      },
    });

    return 'session destroyed';
  }
}
