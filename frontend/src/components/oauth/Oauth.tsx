import { useQuery } from '@apollo/client';
import { GOOGLE_AUTH, GITHUB_AUTH } from 'query/oauth';
import { useEffect, FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from 'templates/Loader';

export const OAuth: FC<{ query: 'githubAuth' | 'googleAuth' }> = ({
  query = 'googleAuth',
}) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(
    query === 'githubAuth' ? GITHUB_AUTH : GOOGLE_AUTH,
    { variables: { token: params.get('code') } }
  );

  useEffect(() => {
    if (data?.[query]?.access_token) {
      localStorage.setItem('access_token', data?.googleAuth?.access_token);
      navigate('/home');
    } else console.error('something went wrong: ', error);
  }, [data]);

  if (loading) return <Loader loading={loading} />;

  return <div>{error ? error.message : 'Success'}</div>;
};
