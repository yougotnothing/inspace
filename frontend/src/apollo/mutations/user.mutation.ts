import { gql } from '@apollo/client';

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      avatarUrl
      isHaveAvatar
    }
  }
`;

export const DELETE_USER = gql`
  query DeleteUser {
    deleteUser {
      message
    }
  }
`;
