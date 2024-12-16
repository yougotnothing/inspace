import { FC } from 'react';
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
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { useSelf } from 'hooks/use-self';

export const AirPollution: FC<{ loading: boolean; data: any }> = ({
  loading,
  data,
}) => {
  const { data: user } = useSelf();
  useGSAPOnload([loading, data], {
    className: '.pollution',
    duration: 0.3,
    delay: 0.5,
  });

  const CloudIcon = (() => {
    switch (data.getAirPollutionInfo?.aqi) {
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

  if (loading) return <Loader loading={loading} />;

  return (
    <Wrapper className="pollution">
      <HeaderWrapper>
        {CloudIcon}
        <Paragraph>
          air quality: <b>{data.getAirPollutionInfo?.aqi}</b>
        </Paragraph>
      </HeaderWrapper>
      <Paragraph>
        <b>
          {new Date(data.getAirPollutionInfo?.date).toTimezone(
            user?.getSelf.timezone
          )}
        </b>
      </Paragraph>
      <Button>browse more</Button>
    </Wrapper>
  );
};
