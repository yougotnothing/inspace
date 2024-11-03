import { Module } from '@nestjs/common';
import { redisClientFactory } from 'factory/redis';
import { RedisRepository } from 'repository/redis';
import { RedisService } from 'service/redis';

@Module({
  providers: [redisClientFactory, RedisService, RedisRepository],
  exports: [RedisService, RedisRepository],
})
export class RedisModule {}
