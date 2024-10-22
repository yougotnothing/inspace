import { Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { Request } from 'express';
import { ChangeAvatar } from 'model/change-avatar';
import { PrismaService } from 'service/prisma';
import { Buffer } from 'buffer';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectMinio()
    private readonly minioClient: Client,
    private readonly prismaService: PrismaService
  ) {}

  async changeAvatar(image: string, req: Request): Promise<ChangeAvatar> {
    const buffer = Buffer.from(image, 'base64');
    const imageName = `${Date.now()}-${req.session['user'].id}`;

    await this.minioClient.putObject('users', imageName, buffer);
    const imageUrl = await this.minioClient.presignedUrl(
      'GET',
      'users',
      imageName
    );

    await this.prismaService.user.update({
      where: {
        id: req.session['user'].id,
      },
      data: {
        avatar: imageUrl,
        isHaveAvatar: true,
      },
    });

    return {
      message: 'avatar changed success',
      avatar: imageUrl,
    };
  }
}
