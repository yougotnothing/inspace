import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
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

export const Home = () => {
  const [date] = useState<Date>(new Date());
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    height: 0,
  });
  const { data: countryData, loading: countryLoading } = useQuery(
    GET_LOCATION,
    {
      variables: {
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      },
      refetchWritePolicy: 'overwrite',
      fetchPolicy: 'cache-first',
    }
  );
  const { data, loading } = useQuery(GET_ALL_EVENTS, {
    variables: {
      startTime: date,
      observer: coords,
      date,
      location: {
        country: countryData?.getLocation.countryName,
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

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      setCoords({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        height: p.coords.altitude || 20,
      });
    });
  }, []);

  useEffect(() => {
    if (countryData?.getLocation.countryName)
      localStorage.setItem('user-country', countryData.getLocation.countryName);
  }, [countryData?.getLocation.countryName]);

  if (countryLoading || loading)
    return <Loader loading={countryLoading || loading} />;

  return (
    <Wrapper>
      {data && (
        <>
          <Shadow className="shadow" />
          <Navbar
            mappings={[
              '/profile',
              `/moon-phase?country=${countryData.getLocation?.countryName}`,
              '/events',
            ]}
          />
          <Content>
            <Events>
              {Object.values(EventsEnum).map((type, index) => (
                <EventsWrapper className="events" key={index}>
                  <Eclipse
                    loading={loading}
                    query={{
                      data,
                      type: type as 'local solar' | 'global solar' | 'lunar',
                    }}
                  />
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
