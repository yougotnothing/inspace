import styled from 'styled-components';
import { Button } from 'styles/Button';
import { Colors } from 'utils/colors.enum';

export const AvatarInput = styled('input')`
  display: none;
`;

export const Avatar = styled('img')`
  position: relative;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
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
  width: 100%;
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

export const AvatarLabel = styled('label')`
  cursor: pointer;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background-color: ${localStorage.getItem('default-avatar-color')};
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
  width: 41rem;
  height: 100%;
  align-items: flex-start;
`;

export const ToSpottedWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
  width: 25rem;
  max-height: 65rem;
  min-height: 5rem;
  overflow-y: auto;
  position: relative;
  opacity: 0;
  top: 17px;
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
    background-color: ${Colors.RED};
  }
`;

export const LogoutButton = styled(Button)`
  &:hover {
    background-color: ${Colors.BLUE};
  }
`;

export const UserInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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

export const NotWerifiedEmailWrapper = styled('button')<{
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
