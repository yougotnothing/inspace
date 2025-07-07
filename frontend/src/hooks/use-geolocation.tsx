import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    height: 0,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Геолокация не поддерживается браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      p => {
        setCoords({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
          height: p.coords.altitude || 20,
        });
      },
      console.error,
      { timeout: 1000, maximumAge: 0, enableHighAccuracy: true }
    );
  }, []);

  return coords;
};
