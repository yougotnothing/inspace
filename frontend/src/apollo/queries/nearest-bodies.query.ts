import { gql } from '@apollo/client';

const nearestBodiesFields = `
  cd
  des
  diameter
  diameter_sigma
  dist
  dist_max
  dist_min
  fullname
  h
  jd
  orbit_id
  t_sigma_f
  v_inf
  v_rel
`;

export const GET_NEAREST_ASTEROIDS = gql`
  query GetNearestAsteroids($data: NearestBodiesInput!) {
    getNearestAsteroids(data: $data) {
      ${nearestBodiesFields}
    }
  }
`;

export const GET_NEAREST_COMETS = gql`
  query GetNearestComets($data: NearestBodiesInput!) {
    getNearestComets(data: $data) {
      ${nearestBodiesFields}
    }
  }
`;
