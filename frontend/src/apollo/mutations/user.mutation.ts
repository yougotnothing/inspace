import { gql } from '@apollo/client';

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      avatarUrl
      isHaveAvatar
    }
  }
`;
