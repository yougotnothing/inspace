import { useQuery } from '@apollo/client';
import { GET_AIR_POLLUTION_INFO } from 'apollo/queries/air-pollution.query';
import { FC, useLayoutEffect, useState } from 'react';
import { Loader } from './Loader';
import { HeaderWrapper, Wrapper } from 'styles/Air-pollution';
import {
  SparklesIcon,
  StarHalfIcon,
  StarsIcon,
  SunCloud01Icon,
} from 'hugeicons-react';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const AirPollution: FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const { data, loading, error } = useQuery(GET_AIR_POLLUTION_INFO, {
    variables: {
      coords: {
        lat: latitude,
        lon: longitude,
      },
    },
  });

  useGSAP(() => {
    if (!loading && data) {
      gsap.to('.pollution', {
        opacity: 1,
        marginTop: 0,
        duration: 0.3,
        delay: 0.5,
      });
    }
  }, [loading, data]);

  if (error) return <h1>{error.message}</h1>;
  if (loading) return <Loader loading={loading} />;

  const CloudIcon = (() => {
    switch (data.getAirPollutionInfo.aqi) {
      case 'good':
        return <StarsIcon color="#fff" size={64} />;
      case 'fair':
        return <SparklesIcon color="#fff" size={64} />;
      case 'moderate':
        return <StarHalfIcon color="#fff" size={64} />;
      case 'poor':
      case 'very poor':
        return <SunCloud01Icon color="#fff" size={64} />;
    }
  })();

  return (
    <Wrapper className="pollution">
      <HeaderWrapper>
        {CloudIcon}
        <Paragraph>
          air quality: <b>{data.getAirPollutionInfo.aqi}</b>
        </Paragraph>
      </HeaderWrapper>
      <Paragraph>
        <b>{data.getAirPollutionInfo.date.replace('GMT', '')}</b>
      </Paragraph>
      <Button>browse more</Button>
    </Wrapper>
  );
};
