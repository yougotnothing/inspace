import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_NEAREST_ASTEROIDS,
  GET_NEAREST_COMETS,
} from 'query/nearest-bodies';
import {
  Bodies,
  Body,
  BodyColumn,
  EventsWrapper,
  SearchSettings,
  Shadow,
} from './Events.styled';
import { TransparentButton } from 'styles/Transparent-button';
import { Paragraph } from 'styles/Paragraph';
import { Content } from 'styles/Content';
import { Wrapper } from 'styles/Wrapper';
import { Header } from 'styles/Header';
import { Button } from 'styles/Button';
import { Navbar } from 'templates/Navbar';
import { Loader } from 'templates/Loader';
import { NearestBodies } from 'types/nearest-bodies';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { useNearestBodies } from 'hooks/use-nearest-bodies';

export const Events = () => {
  const distance_in = localStorage.getItem('shown_distance');
  const [bodies, setBodies] = useNearestBodies();
  const [limit_from, setLimit_from] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [bodiesType, setBodiesType] = useState<'comets' | 'asteroids'>(
    'asteroids'
  );
  const [getNearestAsteroids, { loading: asteroidsLoading }] = useLazyQuery(
    GET_NEAREST_ASTEROIDS
  );
  const [getNearestComets, { loading: cometsLoading }] =
    useLazyQuery(GET_NEAREST_COMETS);

  const handleCallNearestBodies = async () => {
    if (bodiesType === 'asteroids') await handleUpdateNearestAsteroids();
    else await handleUpdateNearestComets();
  };

  const variables = useMemo(
    () => ({ data: { limit_from, distance_in } }),
    [limit_from]
  );

  const handleUpdateNearestAsteroids = async () =>
    await getNearestAsteroids({ variables }).then(data => {
      setBodies(
        (data.data?.getNearestAsteroids satisfies NearestBodies[]) ?? []
      );
    });
  const handleUpdateNearestComets = async () =>
    await getNearestComets({ variables }).then(data => {
      setBodies((data.data?.getNearestComets satisfies NearestBodies[]) ?? []);
    });

  const handleScroll = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setIsFetching(true);
    }
  };

  useGSAPOnload([bodies, asteroidsLoading, cometsLoading], {
    className: '.shadow',
    duration: 0.5,
    delay: 1.3,
    boxShadow: '0 0 270px 270px #ffffff1f',
    top: '50%',
  });

  useEffect(() => {
    console.log('bodies length: ', bodies.length);

    if (isFetching) {
      setLimit_from(bodies.length);
      handleCallNearestBodies().then(() => setIsFetching(false));
    }
  }, [isFetching, bodies]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleCallNearestBodies();
  }, [bodiesType]);

  const isLoading =
    bodiesType === 'asteroids' ? asteroidsLoading : cometsLoading;

  if (isLoading && isFetching === false)
    return <Loader loading={isLoading && isFetching === false} />;

  return (
    <Wrapper>
      <Shadow className="shadow" />
      <Navbar
        mappings={[
          '/home',
          `/moon-phase?country=${localStorage.getItem('user-country')}`,
          '/profile',
        ]}
      />
      <Content>
        <EventsWrapper>
          <SearchSettings>
            <TransparentButton onClick={() => setBodiesType('comets')}>
              Get nearest comets
            </TransparentButton>
            <TransparentButton onClick={() => setBodiesType('asteroids')}>
              Get nearest asteroids
            </TransparentButton>
          </SearchSettings>
          <Bodies>
            {bodies.length > 0 &&
              bodies.map((body, index) => (
                <Body key={index}>
                  <BodyColumn>
                    <Header>{body.des}</Header>
                    <Paragraph>{body.cd}</Paragraph>
                    <Paragraph>
                      {parseFloat(body.dist).toFixed(2)}{' '}
                      {localStorage.getItem('shown_distance')?.toLowerCase()}
                    </Paragraph>
                  </BodyColumn>
                  <BodyColumn>
                    <Paragraph>
                      fullname: <strong>{body.fullname?.trim()}</strong>
                    </Paragraph>
                    <Paragraph>
                      max distance: {parseFloat(body.dist_max).toFixed(2)}{' '}
                      {localStorage.getItem('shown_distance')?.toLowerCase()}
                    </Paragraph>
                    <Paragraph>
                      min distance: {parseFloat(body.dist_min).toFixed(2)}{' '}
                      {localStorage.getItem('shown_distance')?.toLowerCase()}
                    </Paragraph>
                    <Paragraph>
                      diameter: {body.diameter ?? 'unknown'}
                    </Paragraph>
                    <Button style={{ marginTop: '2rem' }}>Look more</Button>
                  </BodyColumn>
                </Body>
              ))}
          </Bodies>
        </EventsWrapper>
      </Content>
    </Wrapper>
  );
};
