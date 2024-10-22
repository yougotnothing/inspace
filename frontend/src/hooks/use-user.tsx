import { useBackgroundQuery } from '@apollo/client';
import { GET_USER_BY_ID } from 'apollo/queries/user.query';
import { User } from 'types/user';

export const useUser = (id: string) => {
  const [queryRef] = useBackgroundQuery<User>(GET_USER_BY_ID, {
    variables: {
      id,
    },
  });

  return queryRef;
};
