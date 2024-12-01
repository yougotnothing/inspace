import { gql } from '@apollo/client';

export const GET_GOOGLE_CODE = gql`
  query GetGoogleCode {
    getGoogleCode
  }
`;

export const GOOGLE_AUTH = gql`
  query GoogleAuth($token: String!) {
    googleAuth(token: $token) {
      success
      user_info {
        email
        name
        avatar
        email_verified
      }
    }
  }
`;

export const GET_GITHUB_CODE = gql`
  query GetGithubCode {
    getGithubCode
  }
`;
