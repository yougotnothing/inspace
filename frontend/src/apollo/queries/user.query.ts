import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      name
      avatar
      id
      email
      isHaveAvatar
      isVerified
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query GetUserByName($name: String!) {
    getUserByName(name: $name) {
      name
      avatar
      id
      email
      isHaveAvatar
      isVerified
    }
  }
`;
