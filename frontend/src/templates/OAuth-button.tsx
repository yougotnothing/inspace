import { FC } from 'react';
import { GoogleIcon, GithubIcon } from 'hugeicons-react';
import styled from 'styled-components';

const A = styled('a')`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  color: black;
  padding: 0.5rem 1rem;
  transition: 0.3s ease;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  background: white;

  &:hover {
    background: transparent;
    color: white;
  }
`;

export const OAuthButton: FC<{ service: 'google' | 'github' }> = ({
  service,
}) => {
  const Icon =
    service === 'google' ? (
      <GoogleIcon size="1.5rem" />
    ) : (
      <GithubIcon size="1.5rem" />
    );

  const handleGetCode = ((): string =>
    service === 'google'
      ? 'http://localhost:8000/auth/oauth/google/callback'
      : 'http://localhost:8000/auth/oauth/github/callback')();

  return (
    <A target="_self" href={handleGetCode}>
      {Icon} {service}
    </A>
  );
};
