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
      err => console.error('Ошибка геолокации:', err),
      { timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return coords;
};
