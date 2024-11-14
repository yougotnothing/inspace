import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject('RedisClient') private readonly client: Redis) {}

  onModuleDestroy(): void {
    this.client.disconnect();
  }

  async set(prefix: string, key: string, value: string) {
    return this.client.set(`${prefix}:${key}`, value);
  }

  async get(prefix: string, key: string) {
    return this.client.get(`${prefix}:${key}`);
  }

  async delete(prefix: string, key: string) {
    await this.client.del(`${prefix}:${key}`);
  }

  async setWithExpire(
    prefix: string,
    key: string,
    value: string,
    expire: number
  ) {
    return this.client.set(`${prefix}:${key}`, value, 'EX', expire);
  }
}
