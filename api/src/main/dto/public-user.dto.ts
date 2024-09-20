export interface PublicUserDto {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isHaveAvatar: boolean;
  isVerified: boolean;
  actions: unknown[];
}
