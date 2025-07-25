import { useQuery } from '@apollo/client';
import { GET_FULL_MOON_PHASE_DATA } from 'query/moon-phase';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import moonTexture from '../../assets/moon-texture.jpg';
import moonDisplacement from '../../assets/moon-displacement.jpg';
import { useSearchParams } from 'react-router-dom';
import {
  HeaderInfo,
  HeaderWrapper,
  Moon,
  MoonPhaseInfoWrapper,
  Header,
  Info,
  Light,
} from './Moon-phase.styled';
import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { Paragraph } from 'styles/Paragraph';
import { Loader } from 'templates/Loader';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { useTitle } from 'hooks/use-title';
import { renderMoon } from './render-moon';

export const MoonPhase = () => {
  const country = useSearchParams()[0].get('country') ?? 'Ukraine';
  const variables = useMemo(
    () => ({
      location: { country, date: new Date() },
      data: {
        date: new Date(),
        country,
        distance: (
          localStorage.getItem('shown_distance') ?? 'KM'
        ).toUpperCase(),
      },
    }),
    [country]
  );
  const threeRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(GET_FULL_MOON_PHASE_DATA, {
    variables,
  });

  useEffect(() => {
    if (loading || error || !data) return;

    renderMoon(threeRef, data);
  }, [loading, error, data]);

  useTitle(`phase — ${data?.getMoonPhase?.phase}${data?.getMoonPhase?.emoji}`);
  useGSAPOnload(
    [loading, data],
    { className: '.moon', delay: 0.5, duration: 0.4 },
    { className: '.current-phase', delay: 1, duration: 0.5 },
    { className: '.lunar-apsis', delay: 1.4, duration: 0.5 },
    {
      className: '.light',
      delay: 2,
      duration: 0.3,
      top: '50%',
      boxShadow: '0 0 270px 270px var(--border-color)',
    }
  );

  if (loading) return <Loader loading={loading} />;

  return (
    <Wrapper>
      {data && (
        <>
          <Navbar mappings={['/profile', '/home', '/events']} />
          <HeaderWrapper>
            <Moon
              className="moon"
              ref={threeRef}
              $rotate={data.getMoonPhase?.declination}
            />
            <HeaderInfo>
              <Light className="light" />
              <Info className="current-phase">
                <Header>Current moon data:</Header>
                <MoonPhaseInfoWrapper>
                  <Paragraph>Phase: {data.getMoonPhase?.phase}</Paragraph>
                  <Paragraph>
                    Hemisphere: {data.getMoonPhase?.hemisphere}
                  </Paragraph>
                  <Paragraph>
                    Illumination: {data.getMoonPhase?.illumination}%
                  </Paragraph>
                  <Paragraph>
                    Declination: {data.getMoonPhase?.declination.toFixed(3)}°
                  </Paragraph>
                  <Paragraph>
                    Distance: {data.getMoonPhase?.distance.toFixed(1)}{' '}
                    {localStorage.getItem('shown_distance')!.toLowerCase()}
                  </Paragraph>
                </MoonPhaseInfoWrapper>
              </Info>
              <Info className="lunar-apsis">
                <Header>About next lunar apsis:</Header>
                <MoonPhaseInfoWrapper>
                  <Paragraph>kind: {data.searchLunarApsis?.kind}</Paragraph>
                  <Paragraph>phase: {data.searchLunarApsis?.phase}</Paragraph>
                  <Paragraph>
                    date:{' '}
                    {new Date(data.searchLunarApsis?.time.date).toTimezone()}
                  </Paragraph>
                  <Paragraph>
                    distance: {data.searchLunarApsis?.distance.toFixed(1)}
                    {localStorage.getItem('shown_distance')}
                  </Paragraph>
                </MoonPhaseInfoWrapper>
              </Info>
            </HeaderInfo>
          </HeaderWrapper>
        </>
      )}
    </Wrapper>
  );
};
