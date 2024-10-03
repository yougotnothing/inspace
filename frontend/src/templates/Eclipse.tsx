import { DocumentNode, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { Header } from 'styles/Header';
import { DateAndAltitude, Event } from 'styles/Eclipses';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { Loader } from './Loader';

interface Query {
  data: DocumentNode;
  type: 'local solar' | 'global solar' | 'lunar';
}

interface Variables {
  [key: string]: object;
}

export const Eclipse: FC<{
  query: Query;
  variable: Variables;
}> = ({ query, variable }) => {
  const [body] = useState<typeof variable>(variable);
  const { data, loading, error } = useQuery(query.data, {
    variables: body,
  });

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const date = (() => {
    switch (query.type) {
      case 'local solar':
        return new Date(data.nextLocalSolarEclipse.peak.time.date)
          .toUTCString()
          .replace('GMT', '');
      case 'global solar':
        return new Date(data.nextGlobalSolarEclipse.peak.date)
          .toUTCString()
          .replace('GMT', '');
      case 'lunar':
        return new Date(data.nextLunarEclipse.peak.date)
          .toUTCString()
          .replace('GMT', '');
    }
  })();
  const altitudeOrKind = (() => {
    switch (query.type) {
      case 'local solar':
        return (
          <Paragraph>
            altitude: {data.nextLocalSolarEclipse.peak.altitude.toFixed(3)}°
          </Paragraph>
        );
      case 'global solar':
        return (
          <Paragraph>
            distance: {data.nextGlobalSolarEclipse.distance.toFixed(3)}km
          </Paragraph>
        );
      case 'lunar':
        return <Paragraph>kind: {data.nextLunarEclipse.kind}</Paragraph>;
    }
  })();

  return (
    <Event>
      <Header>
        {query.type === 'lunar' ? 'Next lunar' : query.type} eclipse
      </Header>
      <DateAndAltitude>
        <Event>
          <Paragraph>{date}</Paragraph>
          {altitudeOrKind}
        </Event>
        <Event>
          <Button style={{ margin: 'auto 0 0 auto' }}>browse more</Button>
        </Event>
      </DateAndAltitude>
    </Event>
  );
};
