import { gql } from '@apollo/client';

export const GET_LOCATION = gql`
  query GetLocation($coordinates: GeolocationInput!) {
    getLocation(coordinates: $coordinates) {
      placeName
      countryName
    }
  }
`;
