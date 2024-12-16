import { FC } from 'react';
import { GoogleIcon, GithubIcon } from 'hugeicons-react';
import { useLazyQuery } from '@apollo/client';
import { MoonLoader } from 'react-spinners';
import { GET_GITHUB_CODE, GET_GOOGLE_CODE } from 'query/oauth';

export const OAuthButton: FC<{ service: 'google' | 'github' }> = ({
  service,
}) => {
  const Icon =
    service === 'google' ? (
      <GoogleIcon size="1.5rem" />
    ) : (
      <GithubIcon size="1.5rem" />
    );
  const [
    getGithubCode,
    { data: githubData, loading: githubLoading, error: githubError },
  ] = useLazyQuery(GET_GITHUB_CODE);
  const [
    getGoogleCode,
    { data: googleData, loading: googleLoading, error: googleError },
  ] = useLazyQuery(GET_GOOGLE_CODE);
  const isLoading = githubLoading || googleLoading;

  const handleGetCode = async () =>
    service === 'google' ? await getGoogleCode() : await getGithubCode();

  return (
    <a target="_self" href="http://localhost:8000/auth/oauth/auth">
      {isLoading ? <MoonLoader size="1.5rem" /> : Icon} continue with {service}
    </a>
  );
};
