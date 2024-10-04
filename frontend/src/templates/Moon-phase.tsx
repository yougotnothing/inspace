import { FC, useRef } from 'react';
import { Loader } from './Loader';
import { LunarEmoji, Phase, Row, Wrapper } from 'styles/Moon-phase';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MoonPhase: FC<{ loading: boolean; data: any }> = ({
  loading,
  data,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      if (!loading && data) {
        gsap.to('.wrapper', {
          opacity: 1,
          marginTop: 0,
          duration: 0.3,
          delay: 0.5,
        });

        gsap.to('.shadow', {
          opacity: 1,
          boxShadow: '0 0 270px 270px #ffffff1f',
          duration: 0.7,
          delay: 1.3,
        });
      }
    },
    { dependencies: [loading, data] }
  );

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
