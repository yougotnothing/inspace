import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Wrapper } from 'styles/Wrapper';
import { Loader } from 'templates/Loader';
import {
  Avatar,
  AvatarInput,
  AvatarLabel,
  MainWrapper,
  NotVerifiedEmailWrapper,
  PencilEditButton,
  Shadow,
  ToSpottedWrapper,
  UserProfile,
  UserNameInput,
  UserNameWrapper,
  UserInfoWrapper,
  UserInfo,
  Footer,
  DeleteAccountButton,
  LogoutButton,
  SpottedItems,
  SpottedColumn,
  Spotted,
} from './Profile.styled';
import { UserIcon, PencilEdit01Icon } from 'hugeicons-react';
import { UPLOAD_AVATAR } from 'mutation/user';
import { Navbar } from 'templates/Navbar';
import { Content } from 'styles/Content';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { Paragraph } from 'styles/Paragraph';
import { TransparentButton } from 'styles/Transparent-button';
import { Route } from 'styles/Route';
import { SEND_VERIFY_EMAIL } from 'mutation/email';
import { Settings } from './components/Settings';
import { DeleteUserModal } from 'components/modals/delete-user/Delete-user-modal';
import { useSelf } from 'hooks/use-self';
import { useTitle } from 'hooks/use-title';
import { LOGOUT } from 'mutation/auth';
import { Button } from 'styles/Button';
import { useSpottedKeys } from 'hooks/use-spotted-keys';
import { useNavigate } from 'react-router-dom';
import { SpottedModal } from './components/Spotted-modal';

export const Profile = () => {
  const [isEmailWarningVisible, setIsEmailWarningVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spottedId, setSpottedId] = useState<string | null>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error } = useSelf('network-only');
  const [uploadAvatar, { loading: isUploadingAvatar }] =
    useMutation(UPLOAD_AVATAR);
  const [logout] = useMutation(LOGOUT);
  const [keys, transformKey] = useSpottedKeys(data);
  const navigate = useNavigate();
  const [sendVerifyEmail, { loading: isSendingVerifyEmail }] = useMutation(
    SEND_VERIFY_EMAIL,
    {
      variables: { email: data?.getSelf?.email },
    }
  );
  const handleClickPencilEditButton = () => {
    setIsFocused(!isFocused);

    if (!isFocused) userNameInputRef.current?.focus();
    else userNameInputRef.current?.blur();
  };

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem('access_token');

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEmailWarning = () => setIsEmailWarningVisible(false);

  useTitle(`profile — ${data?.getSelf?.name}`);
  useGSAPOnload(
    [loading, data],
    { className: '.user-profile', duration: 0.7, delay: 0.6 },
    {
      className: '.shadow',
      duration: 0.6,
      delay: 1.3,
      top: '50%',
      boxShadow: '0 0 270px 270px #ffffff1f',
    },
    { className: '.footer', duration: 0.5, delay: 1.5 },
    { className: '.not-verified-email', duration: 0.3, delay: 0.9 },
    { className: '.to-spotted', duration: 0.7, delay: 1.4 },
    { className: '.user-info', duration: 0.3, delay: 1.7 },
    { className: '.settings', duration: 0.3, delay: 1.7 }
  );

  if (loading || isUploadingAvatar || isSendingVerifyEmail)
    return (
      <Loader loading={loading || isUploadingAvatar || isSendingVerifyEmail} />
    );
  if (error) console.error(error);

  return (
    <>
      {data && (
        <>
          <SpottedModal
            id={spottedId}
            isOpen={Boolean(spottedId)}
            onClose={() => setSpottedId(null)}
          />
          <DeleteUserModal
            isOpen={isModalOpen}
            email={data.getSelf?.email}
            setIsOpen={setIsModalOpen}
          />
          <Wrapper>
            <Navbar
              mappings={[
                '/home',
                `/moon-phase?country=${localStorage.getItem('user-country')}`,
                '/events',
              ]}
            />
            <Content style={{ gap: '3rem', justifyContent: 'initial' }}>
              <Shadow className="shadow" />
              <AvatarInput type="file" id="avatar-input" accept="image/*" />
              <MainWrapper>
                <UserProfile className="user-profile">
                  <AvatarLabel
                    $isHaveAvatar={data.getSelf.isHaveAvatar}
                    htmlFor="avatar-input"
                    onSubmit={e => uploadAvatar({ variables: { avatar: e } })}
                  >
                    {data.getSelf.isHaveAvatar ? (
                      <Avatar
                        src={data.getSelf.avatar.replace('s96-c', 's210-c')}
                        alt={`${data.getSelf.name}-avatar`}
                      />
                    ) : (
                      <UserIcon size={'6rem'} />
                    )}
                  </AvatarLabel>
                  <UserNameWrapper>
                    <UserNameInput
                      ref={userNameInputRef}
                      value={data.getSelf.name}
                    />
                    <PencilEditButton onClick={handleClickPencilEditButton}>
                      <PencilEdit01Icon size={'2rem'} />
                    </PencilEditButton>
                  </UserNameWrapper>
                </UserProfile>
                {!data.getSelf.isVerified && (
                  <NotVerifiedEmailWrapper
                    className="not-verified-email"
                    $isVisible={isEmailWarningVisible}
                    onClick={handleCloseEmailWarning}
                  >
                    <Paragraph>
                      Please verify your email to use{' '}
                      <strong>all features.</strong>
                    </Paragraph>
                  </NotVerifiedEmailWrapper>
                )}
                <UserInfoWrapper className="user-info">
                  <UserInfo>
                    <Paragraph>email: {data.getSelf.email}</Paragraph>
                    {!data.getSelf.isVerified && (
                      <>
                        <Paragraph style={{ color: 'var(--warning-text)' }}>
                          Email not verified
                        </Paragraph>
                        <TransparentButton onClick={() => sendVerifyEmail()}>
                          verify email
                        </TransparentButton>
                      </>
                    )}
                  </UserInfo>
                  <Paragraph>
                    current country: {localStorage.getItem('user-country')}
                  </Paragraph>
                  <UserInfo>
                    <Paragraph>
                      spotted events: {data.getSelf.toSpotted.length}
                    </Paragraph>
                    <Route to="/events">view all</Route>
                  </UserInfo>
                  {keys.map(key => (
                    <Paragraph key={key}>
                      {transformKey(key)}: {data.getSelf?.[key]}
                    </Paragraph>
                  ))}
                </UserInfoWrapper>
              </MainWrapper>
              <MainWrapper>
                <ToSpottedWrapper className="to-spotted">
                  {!data.getSelf.toSpotted.length ? (
                    <Paragraph>You haven't spotted anything yet.</Paragraph>
                  ) : (
                    <SpottedItems>
                      {data.getSelf.toSpotted.map(item => (
                        <Spotted key={item.id}>
                          <SpottedColumn>
                            <Paragraph>
                              {item.description.split(' ')[0]}{' '}
                              {item.description.split(' ')[1]}
                            </Paragraph>
                            <Paragraph>
                              type: {item.type.toLowerCase()}
                            </Paragraph>
                            <Paragraph>
                              {new Date(item.date).toFormattedUTCString()}
                            </Paragraph>
                          </SpottedColumn>
                          <SpottedColumn>
                            <Paragraph>
                              {item.isSpotted ? 'spotted' : "didn't spotted"}
                            </Paragraph>
                            <Button
                              style={{ margin: 'auto 0 0 auto' }}
                              onClick={() => setSpottedId(item.id)}
                            >
                              See more
                            </Button>
                          </SpottedColumn>
                        </Spotted>
                      ))}
                    </SpottedItems>
                  )}
                </ToSpottedWrapper>
                <Settings />
              </MainWrapper>
            </Content>
            <Footer className="footer">
              <LogoutButton onClick={handleLogout}>logout</LogoutButton>
              <DeleteAccountButton onClick={() => setIsModalOpen(true)}>
                delete account
              </DeleteAccountButton>
            </Footer>
          </Wrapper>
        </>
      )}
    </>
  );
};
