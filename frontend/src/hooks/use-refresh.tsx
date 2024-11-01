import { ApolloError, useMutation } from '@apollo/client';
import { REFRESH } from 'apollo/mutations/auth.mutation';
import { useCallback } from 'react';

export const useRefresh = (exception: ApolloError | undefined) => {
  const [refresh, { data, error, loading }] = useMutation(REFRESH);

  const handle = useCallback(async () => {
    if (!exception) return;

    const response = await refresh();

    if (response.data) {
      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', response.data.refresh.access_token);
    }
  }, [exception]);

  return { handle, data, error, loading };
};
