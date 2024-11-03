import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from 'mutation/email';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from 'templates/Loader';
import { Header, Message, MessageWrapper } from './Verify-email.styled';
import { Wrapper } from 'styles/Wrapper';
import { Content } from 'styles/Content';
import { Button } from 'styles/Button';

export const VerifyEmail = () => {
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleContinue = () => navigate('/home');
  const handleClose = () => window.close();

  useEffect(() => {
    if (searchParams.get('u'))
      verifyEmail({ variables: { userId: searchParams.get('u') } });
  }, []);

  if (loading) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <Content>
        {data?.verifyEmail?.userName && (
          <>
            <Header>{data?.verifyEmail?.userName}</Header>
            <MessageWrapper>
              <Message>{data?.verifyEmail?.message}</Message>
              <Button onClick={handleContinue}>Continue</Button>
            </MessageWrapper>
          </>
        )}
        {error && (
          <MessageWrapper>
            <Message>{error.message}</Message>
            <Button onClick={handleClose}>Close window</Button>
          </MessageWrapper>
        )}
      </Content>
    </Wrapper>
  );
};
