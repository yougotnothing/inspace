import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($event: EventInput!) {
    createEvent(event: $event) {
      date
      description
      type
      id
    }
  }
`;
