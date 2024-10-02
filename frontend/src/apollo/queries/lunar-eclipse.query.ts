import { gql } from '@apollo/client';

export const NEXT_LUNAR_ECLIPSE = gql`
  query NextLunarEclipse($date: DateTime!) {
    nextLunarEclipse(date: $date) {
      kind
      obscuration
      peak {
        date
        tt
        ut
      }
      sd_partial
      sd_penum
      sd_total
    }
  }
`;
