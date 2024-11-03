import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: (configService: ConfigService) => {
    const redisInstance = new Redis({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    });

    redisInstance.on('error', error => {
      throw new Error(`Error connection to Redis: ${error}`);
    });

    return redisInstance;
  },
  inject: [ConfigService],
};
