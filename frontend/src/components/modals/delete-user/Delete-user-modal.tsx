import { Paragraph } from 'styles/Paragraph';
import {
  DeleteAccountButton,
  ModalWrapper,
  TextWrapper,
  WarningWrapper,
} from './Delete-user-modal.styled';
import { useMutation } from '@apollo/client';
import { SEND_DELETE_USER_EMAIL } from 'mutation/email';
import { Dispatch, FC, SetStateAction } from 'react';

export const DeleteUserModal: FC<{
  isOpen: boolean;
  email: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, email, setIsOpen }) => {
  const [sendDeleteUserEmail] = useMutation(SEND_DELETE_USER_EMAIL);

  const handleSendEmailMessage = () =>
    sendDeleteUserEmail({ variables: { email } });

  return (
    <ModalWrapper $isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <WarningWrapper>
        <TextWrapper>
          <Paragraph>Are you sure what you want delete your account?</Paragraph>
          <Paragraph>All your data been lost.</Paragraph>
        </TextWrapper>
        <DeleteAccountButton onClick={handleSendEmailMessage}>
          Yes, delete account
        </DeleteAccountButton>
      </WarningWrapper>
    </ModalWrapper>
  );
};
