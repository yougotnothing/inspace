import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './extensions/date.extension';
import { RouterProvider } from 'react-router-dom';
import { router } from '@router';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apollo-client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
