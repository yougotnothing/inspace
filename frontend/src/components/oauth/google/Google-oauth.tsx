import { useQuery } from '@apollo/client';
import { GOOGLE_AUTH } from 'query/oauth';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from 'templates/Loader';

export const GoogleOauth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GOOGLE_AUTH, {
    variables: { token: params.get('code') },
  });

  useEffect(() => {
    if (data?.googleAuth?.access_token) {
      localStorage.setItem('access_token', data?.googleAuth?.access_token);
      navigate('/home');
    } else console.error('something went wrong: ', error);
  }, [data]);

  if (loading) return <Loader loading={loading} />;

  return <div>{error ? error.message : 'Success'}</div>;
};
