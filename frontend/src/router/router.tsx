import { Home } from 'components/home/Home';
import { Login } from 'components/login/Login';
import { MoonPhase } from 'components/moon-phase/Moon-phase';
import { Register } from 'components/register/Register';
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
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'home',
    element: <Home />,
  },
]);
