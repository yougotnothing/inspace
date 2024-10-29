import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:5174/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: localStorage.getItem('access_token')
      ? `Bearer ${localStorage.getItem('access_token')}`
      : '',
    'X-User-Id': localStorage.getItem('user_id') ?? '',
  },
});
