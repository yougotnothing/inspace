import { useEffect, useState } from 'react';
import { Moon } from 'templates/Moon';
import { LunarPhase } from 'types/lunar-phase';

export const MoonPhase = () => {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const [moonPhase, setMoonPhase] = useState<LunarPhase>('Full');
  const [hemisphere, setHemisphere] = useState<'Northern' | 'Southern'>(
    'Northern'
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = position.coords;

        setLocation(position.coords);

        console.log('coordinates', coords);
      },
      error => {
        console.log(error);
        console.warn(
          "Looks like your browser don't support geolocation features. Please try in another browser"
        );
      },
      {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true,
      }
    );

    console.log(navigator.geolocation.watchPosition(position => position));

    console.log(location);
  }, []);

  useEffect(() => console.log(location), [location]);

  return <Moon moonPhase="Full" hemisphere={hemisphere} />;
};
