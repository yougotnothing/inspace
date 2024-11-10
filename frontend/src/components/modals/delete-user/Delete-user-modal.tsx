import { Paragraph } from 'styles/Paragraph';
import {
  DeleteAccountButton,
  ModalWrapper,
  TextWrapper,
  WarningWrapper,
} from './Delete-user-modal.styled';
import { useMutation } from '@apollo/client';
import { SEND_DELETE_USER_EMAIL } from 'mutation/email';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button } from 'styles/Button';

export const DeleteUserModal: FC<{
  isOpen: boolean;
  email: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, email, setIsOpen }) => {
  const [sendDeleteUserEmail, { error }] = useMutation(SEND_DELETE_USER_EMAIL);
  const [isEmailSended, setIsEmailSended] = useState<boolean>(false);

  const handleSendEmailMessage = () => {
    sendDeleteUserEmail({ variables: { email } });
    setIsEmailSended(true);
  };

  return (
    <ModalWrapper $isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <WarningWrapper onClick={e => e.stopPropagation()}>
        {!isEmailSended ? (
          <>
            <TextWrapper>
              <Paragraph>
                Are you sure what you want delete your account?
              </Paragraph>
              <Paragraph>All your data been lost.</Paragraph>
            </TextWrapper>
            <DeleteAccountButton onClick={handleSendEmailMessage}>
              Yes, delete account
            </DeleteAccountButton>
          </>
        ) : (
          <>
            <TextWrapper>
              <Paragraph>
                {error
                  ? error.message
                  : 'We are send you an confirmation email.'}
              </Paragraph>
            </TextWrapper>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </>
        )}
      </WarningWrapper>
    </ModalWrapper>
  );
};
