import styled from 'styled-components';
import { Button } from 'styles/Button';
import { Colors } from 'utils/colors.enum';

export const AvatarInput = styled('input')`
  display: none;
`;

export const Avatar = styled('img')`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  text-align: center;
  text-justify: center;
  border: 1px solid var(--border-bg);
`;

export const UserProfile = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  background-color: var(--wrapper-bg);
  padding: 1rem;
  border-radius: 1rem;
  top: 17px;
  opacity: 0;
  position: relative;
  border: 1px solid var(--border-color);
`;

export const UserNameWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const UserNameInput = styled('input')`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Lexend', sans-serif;
  outline: none;
  padding: 0.5rem;
  width: 100%;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 0.3s ease-in-out;

  &:focus {
    border-bottom-color: var(--border-color);
  }
`;

export const PencilEditButton = styled('button')`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

export const AvatarLabel = styled('label')<{ $isHaveAvatar: boolean }>`
  cursor: pointer;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background-color: ${({ $isHaveAvatar }) =>
    !$isHaveAvatar
      ? localStorage.getItem('default-avatar-color')
      : 'transparent'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: 'Change avatar';
    font-family: 'Fira Mono', sans-serif;
    border: 1px solid var(--border-color);
    font-size: 1.2rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    background-color: #000000ab;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

export const Shadow = styled('div')`
  position: absolute;
  top: 52%;
  box-shadow: 0 0 270px 270px var(--border-color);
  right: 50%;
  left: 50%;
  opacity: 0;
  z-index: 10;
`;

export const MainWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex-grow: 1;
  height: 45.883rem;
`;

export const ToSpottedWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 0.5rem;
  padding: 0 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
  overflow-y: auto;
  position: relative;
  opacity: 0;
  top: 17px;
`;

export const SpottedItems = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const Spotted = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
`;

export const SpottedColumn = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;

export const Footer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5rem;
  position: relative;
  padding-bottom: 3rem;
  z-index: 11;
  top: 17px;
  opacity: 0;
`;

export const DeleteAccountButton = styled(Button)`
  &:hover {
    background-color: rgba(244, 67, 54, 0.27);
    border-color: ${Colors.RED};
    color: ${Colors.RED};
  }
`;

export const LogoutButton = styled(Button)`
  &:hover {
    background-color: rgba(33, 149, 243, 0.27);
    border-color: ${Colors.BLUE};
    color: ${Colors.BLUE};
  }
`;

export const SettingsWrapper = styled(ToSpottedWrapper)`
  align-items: flex-start;
  justify-content: flex-start;
  height: auto;
  padding: 1rem;
  overflow-y: clip;
`;

export const SettingSwitch = styled('button')<{ $settingEnabled: boolean }>`
  background-color: ${({ $settingEnabled }) =>
    $settingEnabled ? 'white' : 'transparent'};
  border: 2px solid white;
  border-radius: 3rem;
  width: 3rem;
  height: 1.5rem;
  padding: 0.2rem;
  transition: 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &::before {
    display: flex;
    content: '';
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${({ $settingEnabled }) =>
      $settingEnabled ? 'black' : 'white'};
    transition: 0.3s ease;
    left: ${({ $settingEnabled }) => ($settingEnabled ? '1.7rem' : '0.2rem')};
  }
`;

export const ShownDistanceSwitch = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 1.5rem;
  border-radius: 3.2rem;
  border: 2px solid white;
  background-color: transparent;
  cursor: pointer;
  color: white;
  font-family: 'Fira Mono', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  transition: 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const UserInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
  position: relative;
  opacity: 0;
  top: 17px;
`;

export const UserInfo = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Setting = styled(UserInfo)``;

export const NotVerifiedEmailWrapper = styled('button')<{
  $isVisible: boolean;
}>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--warning-border);
  background-color: var(--warning);
  position: relative;
  cursor: pointer;
  opacity: 0;
  top: 17px;
`;
