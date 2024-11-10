import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { authLink } from './links/auth.link';
import { httpLink } from './links/http.link';

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  headers: {
    'X-Email-Verified': localStorage.getItem('user_verified') ?? 'false',
  },
});
