import { useQuery } from '@apollo/client';
import { GET_SELF } from 'query/user';
import { useEffect } from 'react';

export const useSelf = () => {
  const { data, error, loading } = useQuery(GET_SELF);

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        'email_verified',
        (data.getSelf?.isVerified satisfies boolean).toString()
      );
      localStorage.setItem('shown_distance', data.getSelf?.shownDistance);
    }
  }, [data]);

  return { data, error, loading };
};
