import { Moon } from 'templates/Moon';
import { useQuery } from '@apollo/client';
import { GET_MOON_PHASE } from '../../apollo/queries/moon-phase.query';
import { useMemo } from 'react';

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

  const { loading, error, data } = useQuery(GET_MOON_PHASE, {
    variables,
  });

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Moon
        moonPhase={data.getMoonPhase.phase}
        hemisphere={data.getMoonPhase.hemisphere}
      />
    </>
  );
};
