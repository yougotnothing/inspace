import { gql } from '@apollo/client';

export const GET_GOOGLE_CODE = gql`
  query GetGoogleCode {
    getGoogleCode
  }
`;

export const GOOGLE_AUTH = gql`
  query GoogleAuth($token: String!) {
    googleAuth(token: $token) {
      access_token
      refresh_token
    }
  }
`;

export const GET_GITHUB_CODE = gql`
  query GetGithubCode {
    getGithubCode
  }
`;

export const GITHUB_AUTH = gql`
  query GithubAuth($token: String!) {
    githubAuth(token: $token) {
      access_token
      refresh_token
    }
  }
`;
