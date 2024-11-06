import { useEffect, useState } from 'react';
import {
  Setting,
  SettingSwitch,
  SettingsWrapper,
  ShownDistanceSwitch,
} from '../Profile.styled';
import { Paragraph } from 'styles/Paragraph';

export const Settings = () => {
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState<boolean>(
    JSON.parse(localStorage.getItem('animations_enabled') ?? 'true') as boolean
  );
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] =
    useState(true);
  const [isShownDistance, setIsShownDistance] = useState<'km' | 'au'>(
    (localStorage.getItem('shown_distance') as 'km' | 'au') || 'km'
  );

  const handleChangeEmailNotifications = () =>
    setIsEmailNotificationsEnabled(prevState => !prevState);

  const handleChangeShownDistance = () => {
    setIsShownDistance(prevState => {
      const newState = prevState === 'km' ? 'au' : 'km';
      localStorage.setItem('shown_distance', newState);
      return newState;
    });
  };

  const handleChangeAnimations = () => {
    setIsAnimationsEnabled(prevState => {
      const newState = !prevState;
      localStorage.setItem('animations_enabled', newState.toString());
      return newState;
    });
  };

  useEffect(() => {
    console.log(isAnimationsEnabled);
  }, [isAnimationsEnabled]);

  return (
    <SettingsWrapper className="settings">
      <Setting>
        <Paragraph>Enable animations</Paragraph>
        <SettingSwitch
          $settingEnabled={isAnimationsEnabled}
          onClick={handleChangeAnimations}
        />
      </Setting>
      <Setting>
        <Paragraph>Enable email notifications</Paragraph>
        <SettingSwitch
          $settingEnabled={isEmailNotificationsEnabled}
          onClick={handleChangeEmailNotifications}
        />
      </Setting>
      <Setting>
        <Paragraph>Shown distance</Paragraph>
        <ShownDistanceSwitch onClick={handleChangeShownDistance}>
          {isShownDistance}
        </ShownDistanceSwitch>
      </Setting>
    </SettingsWrapper>
  );
};
