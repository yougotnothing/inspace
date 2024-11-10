import { useQuery } from '@apollo/client';
import { DELETE_USER } from 'mutation/user';
import { Wrapper } from 'styles/Wrapper';
import { Message, MessageWrapper, MessageContent } from '../Messages.styled';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'templates/Loader';
import { Button } from 'styles/Button';

export const DeleteUser = () => {
  const { data, loading, error } = useQuery(DELETE_USER);
  const navigate = useNavigate();

  const handleReturn = () => navigate('/');
  const handleCloseWindow = () => {
    localStorage.clear();
    window.close();
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <MessageContent>
        {data?.deleteUser?.message && (
          <MessageWrapper>
            <Message>{data?.deleteUser?.message}</Message>
            <Button onClick={handleReturn}>Return to main page</Button>
          </MessageWrapper>
        )}
        {error && (
          <MessageWrapper>
            <Message>{error.message}</Message>
            <Button onClick={handleCloseWindow}>Close window</Button>
          </MessageWrapper>
        )}
      </MessageContent>
    </Wrapper>
  );
};
