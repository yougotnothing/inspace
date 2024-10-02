import { gql } from '@apollo/client';

export const NEXT_LOCAL_SOLAR_ECLIPSE = gql`
  query NextLocalSolarEclipse(
    $startTime: DateTime!
    $observer: ObserverInput!
  ) {
    nextLocalSolarEclipse(startTime: $startTime, observer: $observer) {
      kind
      obscuration
      partial_begin {
        time {
          date
          ut
          tt
        }
        altitude
      }
      partial_end {
        time {
          date
          ut
          tt
        }
        altitude
      }
      total_end {
        time {
          date
          ut
          tt
        }
        altitude
      }
      total_begin {
        time {
          date
          ut
          tt
        }
        altitude
      }
      peak {
        time {
          date
          ut
          tt
        }
        altitude
      }
    }
  }
`;

export const NEXT_GLOBAL_SOLAR_ECLIPSE = gql`
  query NextGlobalSolarEclipse($startTime: DateTime!) {
    nextGlobalSolarEclipse(startTime: $startTime) {
      peak {
        date
        ut
        tt
      }
      distance
      kind
      latitude
      longitude
      obscuration
    }
  }
`;
