import { gql } from '@apollo/client';

export const GET_FULL_MOON_PHASE_DATA = gql`
  query GetMoonPhase(
    $location: MoonPhaseInput!
    $date: DateTime!
    $country: String!
  ) {
    getMoonPhase(location: $location) {
      phase
      hemisphere
      illumination
      declination
      x
      z
      y
    }

    searchLunarApsis(date: $date, country: $country) {
      dist_au
      dist_km
      kind
      phase
      time {
        date
      }
    }
  }
`;

export const GET_WIDGET_MOON_PHASE_DATA = gql`
  query GetMoonPhase($location: MoonPhaseInput!) {
    getMoonPhase(location: $location) {
      emoji
      phase
      illumination
      declination
    }
  }
`;
