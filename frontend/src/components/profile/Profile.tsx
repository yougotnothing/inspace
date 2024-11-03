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
  SettingsWrapper,
  Setting,
  SettingSwitch,
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
import { SEND_VERIFY_EMAIL } from 'mutation/email';
export const Profile = () => {
  const [isEmailWarningVisible, setIsEmailWarningVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isSettingEnabled, setIsSettingEnabled] = useState(true);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error } = useQuery(GET_SELF);
  const [uploadAvatar, { loading: isUploadingAvatar }] =
    useMutation(UPLOAD_AVATAR);
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
    { className: '.user-info', duration: 0.3, delay: 1.7 },
    { className: '.settings', duration: 0.3, delay: 1.7 }
  );

  if (loading || isUploadingAvatar || isSendingVerifyEmail)
    return (
      <Loader loading={loading || isUploadingAvatar || isSendingVerifyEmail} />
    );
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
          {!data.getSelf?.isVerified && (
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
              <Paragraph>spotted events: 0</Paragraph>
              <Route to="/events">view all</Route>
            </UserInfo>
            <Paragraph>
              planetary alignments: {data.getSelf.spottedPlanetaryAlignments}
            </Paragraph>
            <Paragraph>
              lunar eclipses: {data.getSelf.spottedLunarEclipses}
            </Paragraph>
            <Paragraph>
              solar eclipses: {data.getSelf.spottedSolarEclipses}
            </Paragraph>
            <Paragraph>
              meteor showers: {data.getSelf.spottedMeteorShowers}
            </Paragraph>
            <Paragraph>supermoons: {data.getSelf.spottedSupermoons}</Paragraph>
            <Paragraph>micromoons: {data.getSelf.spottedMicromoons}</Paragraph>
          </UserInfoWrapper>
        </MainWrapper>
        <MainWrapper>
          <ToSpottedWrapper className="to-spotted">
            <Paragraph>You haven't spotted anything yet.</Paragraph>
          </ToSpottedWrapper>
          <SettingsWrapper className="settings">
            <Setting>
              <Paragraph>enable animations</Paragraph>
              <SettingSwitch
                $settingEnabled={isSettingEnabled}
                onClick={() => setIsSettingEnabled(!isSettingEnabled)}
              />
            </Setting>
          </SettingsWrapper>
        </MainWrapper>
      </Content>
      <Footer className="footer">
        <LogoutButton>logout</LogoutButton>
        <DeleteAccountButton>delete account</DeleteAccountButton>
      </Footer>
    </Wrapper>
  );
};
