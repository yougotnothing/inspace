import { useQuery } from '@apollo/client';
import { Wrapper } from 'styles/Wrapper';
import { Loader } from 'templates/Loader';
import { Avatar, AvatarInput } from './Profile.styled';
import { GET_USER_BY_ID } from 'apollo/queries/user.query';

export const Profile = () => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: localStorage.getItem('user_id'),
    },
  });

  if (loading) return <Loader loading={loading} />;
  if (error) console.error(error);

  return (
    <Wrapper>
      <AvatarInput type="file" />
      <Avatar />
    </Wrapper>
  );
};
