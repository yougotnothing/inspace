import { UserPlatform } from 'dto/user-platform';

export interface LoginDto {
  login: string;
  password: string;
  userPlatform: UserPlatform;
}
