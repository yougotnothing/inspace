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

export const GOOGLE_AUTH = gql`
  mutation GoogleAuth($code: String!) {
    googleAuth(code: $code) {
      message
    }
  }
`;

export const GET_GOOGLE_CODE = gql`
  mutation GetGoogleCode {
    getGoogleCode {
      code
    }
  }
`;

export const GITHUB_AUTH = gql`
  mutation GithubAuth($code: String!) {
    githubAuth(code: $code) {
      message
    }
  }
`;

export const GET_GITHUB_CODE = gql`
  mutation GetGithubCode {
    getGithubCode {
      code
    }
  }
`;
