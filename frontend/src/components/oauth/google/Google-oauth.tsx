import { useQuery } from '@apollo/client';
import { GOOGLE_AUTH } from 'query/oauth';
import { useEffect } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from 'templates/Loader';

export const GoogleOauth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GOOGLE_AUTH, {
    variables: { token: params.get('token') },
  });

  useEffect(() => {
    if (error?.message === 'User not found (google)') {
      localStorage.setItem(
        'google_avatar',
        data?.googleAuth?.user_info?.avatar
      );

      navigate(
        generatePath('/register:u', {
          u: `${data?.googleAuth?.user_info?.email},${data?.googleAuth?.user_info?.name}`,
        })
      );
    }
  }, [error]);

  if (loading) return <Loader loading={loading} />;

  return <div></div>;
};
