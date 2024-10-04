import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
  query GetAllEvents(
    $startTime: DateTime!
    $observer: ObserverInput!
    $coords: AirPollutionInput!
    $location: MoonPhaseInput!
    $date: DateTime!
  ) {
    nextLunarEclipse(date: $date) {
      kind
      peak {
        date
      }
    }

    nextGlobalSolarEclipse(startTime: $startTime) {
      peak {
        date
      }
      distance
    }

    nextLocalSolarEclipse(startTime: $startTime, observer: $observer) {
      peak {
        time {
          date
        }
        altitude
      }
    }

    getMoonPhase(location: $location) {
      emoji
      phase
      illumination
      declination
    }

    getAirPollutionInfo(coords: $coords) {
      date
      aqi
    }
  }
`;
