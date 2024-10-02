import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Request, Response } from 'express';
import { Session } from 'model/session';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async generate(
    user: { name: string; id: string },
    res: Response
  ): Promise<Session> {
    const userAgent = res.req.headers['user-agent'];

    const existingSession = await this.prismaService.session.findFirst({
      where: {
        userId: user.id,
      },
    });

    console.log('Existing session:', existingSession);

    if (existingSession) {
      if (existingSession.device === userAgent) {
        throw new HttpException(
          'this device is already logged in',
          HttpStatus.CONFLICT
        );
      }
      return existingSession;
    }

    try {
      const date = new Date();
      const expiresIn = new Date(date.setDate(date.getDate() + 7));
      const session = await this.prismaService.session.create({
        data: {
          sessionId: res.req.sessionID,
          userId: user.id,
          device: userAgent,
        },
      });

      res.req.session['user'] = user;

      res.cookie('session', res.req.sessionID, {
        httpOnly: true,
        secure: true,
        maxAge: 360000,
        path: '/',
        expires: expiresIn,
      });

      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new HttpException(
        `Failed to create session: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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
        sessionId: session.sessionId,
      },
    });

    return 'session destroyed';
  }
}
