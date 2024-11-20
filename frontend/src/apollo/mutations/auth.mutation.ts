import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginDto: LoginDtoInput!) {
    login(loginDto: $loginDto) {
      access_token
      refresh_token
      expires_in
      refresh_expires_in
      session_state
    }
  }
`;

export const REGISTER = gql`
  mutation Register($user: RegisterInput!) {
    register(user: $user)
  }
`;

export const REFRESH = gql`
  mutation Refresh {
    refresh {
      access_token
      refresh_token
      expires_in
      refresh_expires_in
      session_state
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
