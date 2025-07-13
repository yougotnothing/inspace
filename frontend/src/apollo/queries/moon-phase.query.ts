import { gql } from '@apollo/client';

export const GET_FULL_MOON_PHASE_DATA = gql`
  query GetMoonPhase($location: MoonPhaseInput!, $data: LunarApsisInput!) {
    getMoonPhase(location: $location) {
      phase
      hemisphere
      illumination
      declination
      distance
      emoji
      x
      z
      y
    }

    searchLunarApsis(data: $data) {
      distance
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
