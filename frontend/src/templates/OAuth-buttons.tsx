import styled from 'styled-components';
import { Paragraph } from 'styles/Paragraph';
import { OAuthButton } from './OAuth-button';

const OAuthWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  width: 100%;
  padding: 1.5rem 2.5rem 0 2.5rem;
  border-top: 1px solid var(--border-color);
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  gap: 2rem;
`;

export const OAuthButtons = () => {
  return (
    <OAuthWrapper>
      <Paragraph>or Authorize with</Paragraph>
      <ButtonsWrapper>
        <OAuthButton service="google" />
        <OAuthButton service="github" />
      </ButtonsWrapper>
    </OAuthWrapper>
  );
};
