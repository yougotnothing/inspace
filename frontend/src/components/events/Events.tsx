import { Content } from 'styles/Content';
import { Wrapper } from 'styles/Wrapper';
import { EventsWrapper } from './Events.styled';
import { Navbar } from 'templates/Navbar';
import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from '@apollo/client';
import {
  GET_NEAREST_ASTEROIDS,
  GET_NEAREST_COMETS,
} from 'query/nearest-bodies';
import { Loader } from 'templates/Loader';
import { useState } from 'react';

export const Events = () => {
  const [nearestBodies, setNearestBodies] = useState([]);
  const [limitFrom, setLimitFrom] = useState<number>(0);
  const [getNearestAsteroids, { data: asteroids, loading: asteroidsLoading }] =
    useLazyQuery(GET_NEAREST_ASTEROIDS);
  const [getNearestComets, { data: comets, loading: cometsLoading }] =
    useLazyQuery(GET_NEAREST_COMETS);

  const handleUpdateNearestBodiesList = (
    func: LazyQueryExecFunction<any, OperationVariables>,
    type: 'getNearestAsteroids' | 'getNearestComets'
  ) => {
    try {
      func({
        variables: {
          date: new Date(),
          limit_from: limitFrom,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (asteroidsLoading || cometsLoading)
    return <Loader loading={asteroidsLoading || cometsLoading} />;

  return (
    <Wrapper>
      <Navbar
        mappings={[
          '/home',
          `/moon-phase?country=${localStorage.getItem('user-country')}`,
          '/profile',
        ]}
      />
      <Content>
        <EventsWrapper></EventsWrapper>
      </Content>
    </Wrapper>
  );
};
