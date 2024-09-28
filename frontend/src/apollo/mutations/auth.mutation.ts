import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginDto: LoginDtoInput!) {
    login(loginDto: $loginDto)
  }
`;
