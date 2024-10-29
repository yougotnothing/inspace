import { ApolloError, useMutation } from '@apollo/client';
import { REFRESH } from 'apollo/mutations/auth.mutation';
import { useEffect } from 'react';

export const useRefresh = (exception: ApolloError | undefined) => {
  const [handle, { data, error, loading }] = useMutation(REFRESH);

  useEffect(() => {
    if (exception)
      handle().then(({ data }) =>
        localStorage.setItem('access_token', data.refresh.access_token)
      );
  }, [exception]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return { handle, data, error, loading };
};
