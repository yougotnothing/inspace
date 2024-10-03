import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_LOCATION } from 'apollo/queries/geolocation.query';
import { FC, useEffect, useRef, useState } from 'react';
import { Loader } from './Loader';
import { LunarEmoji, Phase, Row, Wrapper } from 'styles/Moon-phase';
import { GET_WIDGET_MOON_PHASE_DATA } from 'apollo/queries/moon-phase.query';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MoonPhase: FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [date] = useState<Date>(new Date());
  const {
    data: location,
    loading: locationLoading,
    error: locationError,
  } = useQuery(GET_LOCATION, {
    variables: {
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
    },
  });
  const [getMoonPhase, { data, loading }] = useLazyQuery(
    GET_WIDGET_MOON_PHASE_DATA
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (locationLoading || locationError) return;

    if (location) {
      getMoonPhase({
        variables: {
          location: {
            date,
            country: location.getLocation.countryName,
          },
        },
      });
    }
  }, [location, locationError, locationLoading]);

  useGSAP(
    () => {
      if (!loading && data) {
        gsap.to('.wrapper', {
          opacity: 1,
          marginTop: 0,
          duration: 0.3,
          delay: 0.5,
        });
      }
    },
    { dependencies: [loading, data] }
  );

  if (locationLoading || loading || !data)
    return <Loader loading={locationLoading || loading || !data} />;

  return (
    <Wrapper ref={ref} className="wrapper">
      <Row>
        <LunarEmoji>{data.getMoonPhase.emoji}</LunarEmoji>
        <Phase>{data.getMoonPhase.phase}</Phase>
      </Row>
      <Row>
        <Paragraph>illumination: {data.getMoonPhase.illumination}%</Paragraph>
        <Paragraph>
          declination: {data.getMoonPhase.declination.toFixed(1)}°
        </Paragraph>
      </Row>
      <Button onClick={() => navigate('/moon-phase')}>Browse more</Button>
    </Wrapper>
  );
};
