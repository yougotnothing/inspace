import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { Content, Events, EventsWrapper, Shadow } from './Home.styled';
import { useLayoutEffect, useState } from 'react';
import { AirPollution } from 'templates/Air-pollution';
import { MoonPhase } from 'templates/Moon-phase';
import { useQuery } from '@apollo/client';
import { GET_ALL_EVENTS } from 'apollo/queries/all-events.query';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GET_LOCATION } from 'apollo/queries/geolocation.query';
import { Loader } from 'templates/Loader';
import { Eclipse } from 'templates/Eclipse';

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
  const typeofEvent: TypeofEvent[] = ['local solar', 'global solar', 'lunar'];

  useGSAP(() => {
    if (!loading && data) {
      gsap.to('.events', {
        opacity: 1,
        marginTop: 0,
        duration: 0.7,
        delay: 1,
      });
    }
  }, [data, loading]);

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      setCoords({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        height: p.coords.altitude || 20,
      });
    });
  }, []);

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
              {typeofEvent.map((event, index) => (
                <EventsWrapper className="events" key={index}>
                  <Eclipse loading={loading} query={{ data, type: event }} />
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

type TypeofEvent = 'local solar' | 'global solar' | 'lunar';
