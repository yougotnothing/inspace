import { MoonPhase } from 'components/moon-phase/Moon-phase';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: 'moon-phase',
    element: <MoonPhase />,
  },
]);
