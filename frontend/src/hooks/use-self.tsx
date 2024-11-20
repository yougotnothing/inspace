import { useQuery, WatchQueryFetchPolicy } from '@apollo/client';
import { GET_SELF } from 'query/user';
import { useEffect } from 'react';
import { Self } from 'types/get-self';

export const useSelf = (fetchPolicy?: WatchQueryFetchPolicy) => {
  const { data, error, loading } = useQuery<Self>(GET_SELF, { fetchPolicy });

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
