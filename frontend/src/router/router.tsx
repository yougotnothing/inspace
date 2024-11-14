import { Home } from 'components/home/Home';
import { Login } from 'components/login/Login';
import { MoonPhase } from 'components/moon-phase/Moon-phase';
import { Profile } from 'components/profile/Profile';
import { Register } from 'components/register/Register';
import { VerifyEmail } from 'components/messages/verify-email/Verify-email';
import { Welcome } from 'components/welcome/Welcome';
import { createBrowserRouter } from 'react-router-dom';
import { DeleteUser } from 'components/messages/delete-user/Delete-user';
import { Events } from 'components/events/Events';

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
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'verify-email',
    element: <VerifyEmail />,
  },
  {
    path: 'delete-user',
    element: <DeleteUser />,
  },
  {
    path: 'events',
    element: <Events />,
  },
]);
