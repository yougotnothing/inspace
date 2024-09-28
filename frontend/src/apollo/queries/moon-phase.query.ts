import { gql } from '@apollo/client';

export const GET_MOON_PHASE = gql`
  query GetMoonPhase($location: MoonPhaseInput!) {
    getMoonPhase(location: $location) {
      phase
      hemisphere
      illumination
      declination
      x
      z
    }
  }
`;
