import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client';
import { api } from '../../api/axios.config';

export const authLink = onError(({ graphQLErrors, operation, forward }) => {
  if (
    graphQLErrors?.some(
      error =>
        error.extensions?.code === 'UNAUTHORIZED' ||
        error.extensions?.code === 'FORBIDDEN'
    )
  ) {
    return fromPromise(
      refreshToken().catch(() => {
        localStorage.removeItem('access_token');
        window.location.replace('/login');
        return;
      })
    ).flatMap(() => {
      operation.setContext({
        headers: {
          ...operation.getContext().headers,
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      return forward(operation);
    });
  }
});

const refreshToken = async () => {
  try {
    const response = await api.patch('/openid-connect/refresh');

    localStorage.setItem('access_token', response.data.access_token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
