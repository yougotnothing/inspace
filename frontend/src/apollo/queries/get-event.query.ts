import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query GetEventById($id: String!) {
    getEventById(id: $id) {
      id
      date
      type
      description
      data
    }
  }
`;
