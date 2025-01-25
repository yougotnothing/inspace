import { Wrapper } from 'styles/Wrapper';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  NEXT_GLOBAL_SOLAR_ECLIPSE,
  NEXT_LOCAL_SOLAR_ECLIPSE,
} from 'query/solar-eclipse';
import { NEXT_LUNAR_ECLIPSE } from 'query/lunar-eclipse';
import { useGeolocation } from 'hooks/use-geolocation';
import { useState } from 'react';
import { Header } from 'styles/Header';
import { BlurWrapper } from 'styles/Blur-wrapper';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { Content } from 'styles/Content';
import { Navbar } from 'templates/Navbar';
import { Loader } from 'templates/Loader';
import { Paragraph } from 'styles/Paragraph';
import { FieldHelperParagraph } from 'styles/Field-helper-paragraph';
import { Button } from 'styles/Button';
import { Column } from './Event.styled';

export const Event = () => {
  const { type, date } = useParams();
  const observer = useGeolocation();
  const [eventType] = useState(
    type
      ?.split('-')
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join('') || 'nextLunarEclipse'
  );

  const { data, loading, error } = useQuery(
    (() => {
      switch (type) {
        case 'next-local-solar-eclipse':
          return NEXT_LOCAL_SOLAR_ECLIPSE;
        case 'next-global-solar-eclipse':
          return NEXT_GLOBAL_SOLAR_ECLIPSE;
        case 'next-lunar-eclipse':
          return NEXT_LUNAR_ECLIPSE;
        default:
          return NEXT_LUNAR_ECLIPSE;
      }
    })(),
    {
      variables:
        type === 'next-lunar-eclipse'
          ? { date }
          : { observer, startTime: date },
    }
  );

  useGSAPOnload([data, loading], {
    className: '.events',
    duration: 0.7,
    delay: 1,
  });

  if (loading) return <Loader loading={loading} />;
  if (error) console.error(error);

  return (
    <Wrapper>
      <Navbar
        mappings={[
          '/profile',
          `/moon-phase?country=${localStorage.getItem('user-country')}`,
          '/events',
        ]}
      />
      <Content>
        <Column>
          <BlurWrapper className="events">
            <Header>
              {type
                ?.split('-')
                .map(word => {
                  word[0].toUpperCase();
                  return word;
                })
                .join(' ')
                .replace('next ', '')}
            </Header>
            <Paragraph>
              {eventType === 'nextLocalSolarEclipse'
                ? new Date(
                    data?.[eventType]?.peak.time.date
                  ).toFormattedUTCString()
                : new Date(data?.[eventType]?.peak.date).toFormattedUTCString()}
            </Paragraph>
          </BlurWrapper>
          {eventType === 'nextLocalSolarEclipse' && (
            <>
              <BlurWrapper className="events">
                <FieldHelperParagraph $content="kind of solar eclipse">
                  kind: {data?.[eventType]?.kind}
                </FieldHelperParagraph>
                <FieldHelperParagraph $content="obscuration of solar eclipse">
                  obscuration: {data?.[eventType]?.obscuration}
                </FieldHelperParagraph>
              </BlurWrapper>
              <BlurWrapper className="events">
                <Header>Begin date</Header>
                <FieldHelperParagraph $content="ISO time of begin of solar eclipse">
                  ISO: {data?.[eventType]?.partial_begin.time.date}
                </FieldHelperParagraph>
                <FieldHelperParagraph $content="UT time of begin of solar eclipse">
                  ut: {data?.[eventType]?.partial_begin.time.ut}
                </FieldHelperParagraph>
                <FieldHelperParagraph $content="TT time of begin of solar eclipse">
                  tt: {data?.[eventType]?.partial_begin.time.tt}
                </FieldHelperParagraph>
              </BlurWrapper>
            </>
          )}
        </Column>
      </Content>
    </Wrapper>
  );
};
