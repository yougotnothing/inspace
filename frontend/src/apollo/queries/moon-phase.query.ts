import { gql } from '@apollo/client';

export const GET_MOON_PHASE = gql`
  query GetMoonPhase($location: MoonPhaseInput!) {
    getMoonPhase(location: $location) {
      age
      phase
      hemisphere
    }
  }
`;
