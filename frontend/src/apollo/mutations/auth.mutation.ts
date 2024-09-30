import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginDto: LoginDtoInput!) {
    login(loginDto: $loginDto) {
      sessionId
      message
      userId
      device
    }
  }
`;

export const REGISTER = gql`
  mutation Register($user: RegisterInput!) {
    register(user: $user)
  }
`;
