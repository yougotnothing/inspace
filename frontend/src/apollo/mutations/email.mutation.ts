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

export const SEND_DELETE_USER_EMAIL = gql`
  mutation SendDeleteUserEmail($email: String!) {
    sendDeleteUserEmail(email: $email) {
      message
    }
  }
`;

export const SEND_EVENT_EMAIL = gql`
  mutation SendEventEmail($email: String!, $eventId: String!) {
    sendEventEmail(email: $email, eventId: $eventId) {
      message
    }
  }
`;
