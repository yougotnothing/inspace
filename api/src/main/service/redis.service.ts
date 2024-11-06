import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from 'repository/redis';
import { RedisPrefix } from 'utils/redis-prefix';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository)
    private readonly redisRepository: RedisRepository
  ) {}

  async setVerifyEmail(userId: string, code: string) {
    await this.redisRepository.setWithExpire(
      RedisPrefix.VERIFY_EMAIL,
      userId,
      code,
      60 * 24
    );
  }

  async getVerifyEmail(userId: string) {
    return await this.redisRepository.get(RedisPrefix.VERIFY_EMAIL, userId);
  }

  async deleteVerifyEmail(userId: string) {
    await this.redisRepository.delete(RedisPrefix.VERIFY_EMAIL, userId);
  }

  async setDeleteUser(userId: string, code: string) {
    await this.redisRepository.setWithExpire(
      RedisPrefix.DELETE_USER,
      userId,
      code,
      60 * 24
    );
  }

  async getDeleteUser(userId: string) {
    return await this.redisRepository.get(RedisPrefix.DELETE_USER, userId);
  }

  async deleteDeleteUser(userId: string) {
    await this.redisRepository.delete(RedisPrefix.DELETE_USER, userId);
  }
}
