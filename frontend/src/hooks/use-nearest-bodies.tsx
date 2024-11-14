import { useState } from 'react';
import { NearestBodies } from 'types/nearest-bodies';

export const useNearestBodies = (): [
  NearestBodies[],
  (bodies: NearestBodies[]) => void,
  () => number
] => {
  const [data, setData] = useState<NearestBodies[]>([]);

  const setBodies = (bodies: NearestBodies[]) => {
    setData(prevState => {
      const newBodies = bodies.filter(
        newBody =>
          !prevState.some(
            existingBody =>
              existingBody.des === newBody.des && existingBody.jd === newBody.jd
          )
      );

      return [...prevState, ...newBodies];
    });
  };

  const getLength = () => data.length;

  return [data, setBodies, getLength];
};
