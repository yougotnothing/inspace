import { Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { ChangeAvatar } from 'model/change-avatar';
import { PrismaService } from 'service/prisma';
import { Buffer } from 'buffer';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectMinio()
    private readonly minio: Client,
    private readonly prismaService: PrismaService
  ) {}

  async changeAvatar(image: string, id: string): Promise<ChangeAvatar> {
    const buffer = Buffer.from(image, 'base64');
    const imageName = `${Date.now()}-${id}`;

    await this.minio.putObject('users', imageName, buffer);
    const imageUrl = await this.minio.presignedUrl('GET', 'users', imageName);

    await this.prismaService.user.update({
      where: { id },
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
