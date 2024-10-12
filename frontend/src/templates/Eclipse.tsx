import { FC } from 'react';
import { Header } from 'styles/Header';
import { DateAndAltitude, Event } from 'styles/Eclipses';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { Loader } from './Loader';

interface Query {
  data: any;
  type: 'local solar' | 'global solar' | 'lunar';
}

export const Eclipse: FC<{
  query: Query;
  loading: boolean;
}> = ({ query, loading }) => {
  const date = (() => {
    switch (query.type) {
      case 'local solar':
        return new Date(query.data.nextLocalSolarEclipse?.peak.time.date)
          .toUTCString()
          .replace('GMT', '');
      case 'global solar':
        return new Date(query.data.nextGlobalSolarEclipse?.peak.date)
          .toUTCString()
          .replace('GMT', '');
      case 'lunar':
        return new Date(query.data.nextLunarEclipse?.peak.date)
          .toUTCString()
          .replace('GMT', '');
    }
  })();
  const altitudeOrKind = (() => {
    switch (query.type) {
      case 'local solar':
        return (
          <Paragraph>
            altitude:{' '}
            {query.data.nextLocalSolarEclipse?.peak.altitude.toFixed(3)}°
          </Paragraph>
        );
      case 'global solar':
        return (
          <Paragraph>
            distance: {query.data.nextGlobalSolarEclipse?.distance.toFixed(3)}km
          </Paragraph>
        );
      case 'lunar':
        return <Paragraph>kind: {query.data.nextLunarEclipse?.kind}</Paragraph>;
    }
  })();

  if (loading) return <Loader loading={loading} />;

  return (
    <Event>
      <Header>
        {query.type === 'lunar' ? 'next lunar' : query.type} eclipse
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
