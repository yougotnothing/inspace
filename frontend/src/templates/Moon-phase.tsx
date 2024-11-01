import { FC, useRef } from 'react';
import { Loader } from './Loader';
import { LunarEmoji, Phase, Row, Wrapper } from 'styles/Moon-phase';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { useNavigate } from 'react-router-dom';
import { useGSAPOnload } from 'hooks/use-gsap-onload';

export const MoonPhase: FC<{ loading: boolean; data: any }> = ({
  loading,
  data,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAPOnload([loading, data], {
    className: '.wrapper',
    duration: 0.3,
    delay: 0.5,
  });

  if (loading) return <Loader loading={loading} />;

  return (
    <>
      <Wrapper ref={ref} className="wrapper">
        <Row>
          <LunarEmoji>{data.getMoonPhase?.emoji}</LunarEmoji>
          <Phase>{data.getMoonPhase?.phase}</Phase>
        </Row>
        <Row>
          <Paragraph>
            illumination: {data.getMoonPhase?.illumination}%
          </Paragraph>
          <Paragraph>
            declination: {data.getMoonPhase?.declination.toFixed(1)}°
          </Paragraph>
        </Row>
        <Button onClick={() => navigate('/moon-phase')}>browse more</Button>
      </Wrapper>
    </>
  );
};
