import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: 'http://localhost:5174/graphql',
  credentials: 'include',
  headers: {
    'X-User-Id': localStorage.getItem('user_id') ?? '',
  },
});
