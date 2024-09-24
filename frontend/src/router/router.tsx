import { MoonPhase } from 'components/moon-phase/Moon-phase';
import { Welcome } from 'components/welcome/Welcome';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: 'moon-phase',
    element: <MoonPhase />,
  },
  {
    path: '/',
    element: <Welcome />,
  },
]);
