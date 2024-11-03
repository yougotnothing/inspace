import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($userId: String!) {
    verifyEmail(userId: $userId) {
      message
      userEmail
      userId
      userName
    }
  }
`;

export const SEND_VERIFY_EMAIL = gql`
  mutation SendVerifyEmail($email: String!) {
    sendVerifyEmail(email: $email) {
      message
      userEmail
      userId
      userName
    }
  }
`;
