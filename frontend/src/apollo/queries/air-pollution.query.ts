import { gql } from '@apollo/client';

export const GET_AIR_POLLUTION_INFO = gql`
  query getAirPollutionInfo($coords: AirPollutionInput!) {
    getAirPollutionInfo(coords: $coords) {
      date
      aqi
      coords
      components {
        co
        nh3
        no
        no2
        o3
        pm2_5
        pm10
        so2
      }
    }
  }
`;
