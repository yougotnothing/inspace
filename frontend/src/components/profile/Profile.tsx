import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Wrapper } from 'styles/Wrapper';
import { Loader } from 'templates/Loader';
import {
  Avatar,
  AvatarInput,
  AvatarLabel,
  MainWrapper,
  NotWerifiedEmailWrapper,
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
} from './Profile.styled';
import { UserIcon, PencilEdit01Icon } from 'hugeicons-react';
import { GET_SELF } from 'query/user';
import { UPLOAD_AVATAR } from 'mutation/user';
import { Navbar } from 'templates/Navbar';
import { Content } from 'styles/Content';
import { useGSAPOnload } from 'hooks/use-gsap-onload';
import { Paragraph } from 'styles/Paragraph';
import { TransparentButton } from 'styles/Transparent-button';
import { Route } from 'styles/Route';

export const Profile = () => {
  const [isEmailWarningVisible, setIsEmailWarningVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error } = useQuery(GET_SELF);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR);

  const handleClickPencilEditButton = () => {
    setIsFocused(!isFocused);

    if (!isFocused) userNameInputRef.current?.focus();
    else userNameInputRef.current?.blur();
  };

  const handleCloseEmailWarning = () => setIsEmailWarningVisible(false);

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
    { className: '.user-info', duration: 0.3, delay: 1.7 }
  );

  if (loading) return <Loader loading={loading} />;
  if (error) console.error(error);

  return (
    <Wrapper>
      <Navbar
        mappings={[
          '/home',
          `/moon-phase?country=${localStorage.getItem('user-country')}`,
          '/events',
        ]}
      />
      <Content>
        <Shadow className="shadow" />
        <AvatarInput type="file" id="avatar-input" accept="image/*" />
        <MainWrapper>
          <UserProfile className="user-profile">
            <AvatarLabel
              htmlFor="avatar-input"
              onSubmit={e => uploadAvatar({ variables: { avatar: e } })}
            >
              {data.getSelf.isHaveAvatar ? (
                <Avatar />
              ) : (
                <UserIcon size={'6rem'} />
              )}
            </AvatarLabel>
            <UserNameWrapper>
              <UserNameInput ref={userNameInputRef} value={data.getSelf.name} />
              <PencilEditButton onClick={handleClickPencilEditButton}>
                <PencilEdit01Icon size={'2rem'} />
              </PencilEditButton>
            </UserNameWrapper>
          </UserProfile>
          {!data.getSelf.isVerified && (
            <NotWerifiedEmailWrapper
              className="not-verified-email"
              $isVisible={isEmailWarningVisible}
              onClick={handleCloseEmailWarning}
            >
              <Paragraph>
                Please verify your email to use <strong>all features.</strong>
              </Paragraph>
            </NotWerifiedEmailWrapper>
          )}
          <UserInfoWrapper className="user-info">
            <UserInfo>
              <Paragraph>email: {data.getSelf.email}</Paragraph>
              {!data.getSelf.isVerified && (
                <Paragraph style={{ color: 'var(--warning-text)' }}>
                  Email not verified
                </Paragraph>
              )}
              <TransparentButton>verify email</TransparentButton>
            </UserInfo>
            <Paragraph>
              current country: {localStorage.getItem('user-country')}
            </Paragraph>
            <UserInfo>
              <Paragraph>spotted events: 0</Paragraph>
              <Route to="/events">view all</Route>
            </UserInfo>
            <Paragraph>spotted planetary alignments: 0</Paragraph>
            <Paragraph>spotted lunar eclipses: 0</Paragraph>
            <Paragraph>spotted solar eclipses: 0</Paragraph>
            <Paragraph>spotted meteor showers: 0</Paragraph>
            <Paragraph>spotted supermoons: 0</Paragraph>
            <Paragraph>spotted micromoons: 0</Paragraph>
          </UserInfoWrapper>
        </MainWrapper>
        <ToSpottedWrapper className="to-spotted">
          <Paragraph>You haven't spotted anything yet.</Paragraph>
        </ToSpottedWrapper>
      </Content>
      <Footer className="footer">
        <LogoutButton>logout</LogoutButton>
        <DeleteAccountButton>delete account</DeleteAccountButton>
      </Footer>
    </Wrapper>
  );
};
