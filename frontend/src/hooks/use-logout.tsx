import { useMutation } from '@apollo/client';
import { LOGOUT } from 'mutation/auth';

export const useLogout = () => {
  const [logout, { data, loading, error }] = useMutation(LOGOUT);

  const handle = async () => {
    try {
      await logout();

      localStorage.clear();
    } catch (error: any) {
      console.log(error);
    }
  };

  return [handle, { message: data?.logout?.message, error, loading }];
};
