import { useQuery } from '@apollo/client';
import { GET_AIR_POLLUTION_INFO } from 'apollo/queries/air-pollution.query';
import { useEffect, useState } from 'react';
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

export const AirPollution = () => {
  const [variables, setVariables] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });
  const { data, loading, error } = useQuery(GET_AIR_POLLUTION_INFO, {
    variables: { coords: { ...variables } },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(p =>
      setVariables({ lat: p.coords.latitude, lon: p.coords.longitude })
    );
    console.log(data);
  }, []);

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
    <Wrapper className="wrapper">
      <HeaderWrapper>
        {CloudIcon}
        <Paragraph>
          air quality: <b>{data.getAirPollutionInfo.aqi}</b>
        </Paragraph>
      </HeaderWrapper>
      <Paragraph>
        <b>{data.getAirPollutionInfo.date.replace('GMT', '')}</b>
      </Paragraph>
      <Button>Browse more</Button>
    </Wrapper>
  );
};
