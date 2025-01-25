import { useLayoutEffect, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      setCoords({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        height: p.coords.altitude || 20,
      });
    });
  }, []);

  return coords;
};
