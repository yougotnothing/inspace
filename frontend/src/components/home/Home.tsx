import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Events, EventsWrapper, Shadow } from './Home.styled';
import { Content } from 'styles/Content';
import { AirPollution } from 'templates/Air-pollution';
import { MoonPhase } from 'templates/Moon-phase';
import { Loader } from 'templates/Loader';
import { Eclipse } from 'templates/Eclipse';
import { GET_ALL_EVENTS } from 'apollo/queries/all-events.query';
import { GET_LOCATION } from 'apollo/queries/geolocation.query';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { Events as EventsEnum } from 'utils/events.enum';
import { useSelf } from 'hooks/use-self';
import { useTitle } from 'hooks/use-title';
import { useGeolocation } from 'hooks/use-geolocation';

export const Home = () => {
  const [date] = useState<Date>(new Date());
  const coords = useGeolocation();
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useQuery(GET_LOCATION, {
    variables: {
      coordinates: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    },
    refetchWritePolicy: 'overwrite',
    fetchPolicy: 'cache-first',
  });
  const { data, loading, error } = useQuery(GET_ALL_EVENTS, {
    variables: {
      startTime: date,
      observer: coords,
      date,
      location: {
        country: countryData?.getLocation?.countryName || 'Poland',
        date,
      },
      coords: {
        lat: coords.latitude,
        lon: coords.longitude,
      },
    },
    refetchWritePolicy: 'overwrite',
    fetchPolicy: 'cache-first',
  });

  useTitle('Home');
  useSelf('cache-first');
  useGSAPOnload(
    [data, loading],
    {
      className: '.events',
      duration: 0.7,
      delay: 1,
    },
    {
      className: '.shadow',
      duration: 0.5,
      delay: 1.3,
      boxShadow: '0 0 270px 270px #ffffff1f',
      top: '50%',
    }
  );

  useEffect(() => {
    localStorage.setItem(
      'user-country',
      countryData?.getLocation?.countryName || 'Poland'
    );
  }, [countryData?.getLocation?.countryName]);

  if (countryLoading || loading)
    return <Loader loading={countryLoading || loading} />;
  if (error || countryError) console.error(error || countryError);

  return (
    <Wrapper>
      {data && (
        <>
          <Shadow className="shadow" />
          <Navbar
            mappings={[
              '/profile',
              `/moon-phase?country=${localStorage.getItem('user-country') || countryData?.getLocation?.countryName}`,
              '/events',
            ]}
          />
          <Content>
            <Events>
              {Object.values(EventsEnum).map((type, index) => (
                <EventsWrapper className="events" key={index}>
                  <Eclipse loading={loading} query={{ data, type }} />
                </EventsWrapper>
              ))}
            </Events>
            <Events>
              <AirPollution data={data} loading={loading} />
              <MoonPhase data={data} loading={loading} />
            </Events>
          </Content>
        </>
      )}
    </Wrapper>
  );
};
