import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.GRAPHQL_SERVER_URI,
  cache: new InMemoryCache(),
});
