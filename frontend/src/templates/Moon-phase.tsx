import { useQuery } from '@apollo/client';
import { GET_LOCATION } from 'apollo/queries/geolocation.query';
import { FC, useState } from 'react';
import { Loader } from './Loader';
import { LunarEmoji, Wrapper } from 'styles/Moon-phase';
import { GET_MOON_PHASE } from 'apollo/queries/moon-phase.query';

export const MoonPhase: FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const [date] = useState<Date>(new Date());
  const {
    data: location,
    loading: locationLoading,
    error: locationError,
  } = useQuery(GET_LOCATION, {
    variables: {
      coordinates: {
        latitude,
        longitude,
      },
    },
  });
  const { data, loading, error } = useQuery(GET_MOON_PHASE, {
    variables: {
      date,
      country: location.getLocation.address,
    },
  });

  if (locationLoading || loading)
    return <Loader loading={locationLoading || loading} />;
  if (locationError || error)
    return <h1>{locationError?.message || error?.message}</h1>;

  return (
    <Wrapper>
      <LunarEmoji>{data.emoji}</LunarEmoji>
    </Wrapper>
  );
};
