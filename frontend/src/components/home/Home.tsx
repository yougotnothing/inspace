import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { Content, Events, EventsWrapper } from './Home.styled';
import {
  NEXT_GLOBAL_SOLAR_ECLIPSE,
  NEXT_LOCAL_SOLAR_ECLIPSE,
} from 'apollo/queries/solar-eclipse.query';
import { useEffect, useState } from 'react';
import { Eclipse } from 'templates/Eclipse';
import { NEXT_LUNAR_ECLIPSE } from 'apollo/queries/lunar-eclipse.query';
import { AirPollution } from 'templates/Air-pollution';
import { MoonPhase } from 'templates/Moon-phase';

export const Home = () => {
  const [date] = useState(new Date());
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    height: number;
  }>({ latitude: 0, longitude: 0, height: 0 });

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(p =>
      setCoords({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        height: p.coords.altitude || 20,
      })
    );
  }, []);

  return (
    <Wrapper>
      <Navbar mappings={['/profile', '/moon-phase', '/events']} />
      <Content>
        <Events>
          <EventsWrapper>
            <Eclipse
              query={{
                data: NEXT_LOCAL_SOLAR_ECLIPSE,
                type: 'local solar',
              }}
              variable={{
                startTime: date,
                observer: coords,
              }}
            />
            <Eclipse
              query={{
                data: NEXT_GLOBAL_SOLAR_ECLIPSE,
                type: 'global solar',
              }}
              variable={{
                startTime: date,
                observer: coords,
              }}
            />
            <Eclipse
              query={{
                data: NEXT_LUNAR_ECLIPSE,
                type: 'lunar',
              }}
              variable={{
                date,
              }}
            />
          </EventsWrapper>
        </Events>
        <Events>
          <AirPollution />
          {/* <MoonPhase latitude={coords.latitude} longitude={coords.longitude} /> */}
        </Events>
      </Content>
    </Wrapper>
  );
};
