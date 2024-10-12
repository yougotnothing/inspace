import { gql } from '@apollo/client';

export const GET_FULL_MOON_PHASE_DATA = gql`
  query GetMoonPhase($location: MoonPhaseInput!) {
    getMoonPhase(location: $location) {
      emoji
      phase
      hemisphere
      illumination
      declination
      x
      z
      y
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
