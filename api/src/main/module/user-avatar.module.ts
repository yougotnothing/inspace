import { Module } from '@nestjs/common';
import { MinioModule } from './minio.module';
import { PrismaService } from 'service/prisma';
import { UserAvatarService } from 'service/user-avatar';
import { UserAvatarResolver } from 'resolver/user-avatar';

@Module({
  imports: [MinioModule],
  providers: [PrismaService, UserAvatarService, UserAvatarResolver],
})
export class UserAvatarModule {}
