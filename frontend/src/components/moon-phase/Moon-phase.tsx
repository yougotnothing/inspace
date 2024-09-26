import { useQuery } from '@apollo/client';
import { GET_MOON_PHASE } from '../../apollo/queries/moon-phase.query';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export const MoonPhase = () => {
  const variables = useMemo(
    () => ({
      location: {
        country: 'Poland',
        date: new Date().toISOString().split('T')[0],
      },
    }),
    []
  );
  const threeRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(GET_MOON_PHASE, {
    variables,
  });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerHeight / window.innerWidth,
      1.5,
      5000
    );
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <div ref={threeRef}></div>;
};
