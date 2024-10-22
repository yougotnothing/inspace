import { redisStore } from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const redisOptions = async () =>
          await redisStore({
            socket: {
              host: configService.get<string>('REDIS_HOST'),
              port: +configService.get<number>('REDIS_PORT'),
            },
          });

        return redisOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
