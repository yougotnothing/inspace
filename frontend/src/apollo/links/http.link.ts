import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: 'http://localhost:5174/graphql',
  credentials: 'include',
  headers: {
    'X-Email-Verified': localStorage.getItem('email_verified') ?? 'false',
  },
});
