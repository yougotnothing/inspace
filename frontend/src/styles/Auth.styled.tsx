import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LightProps {
  $top?: number;
  $left?: number;
  $bottom?: number;
  $right?: number;
  $size: 'small' | 'big';
}

export const LoginWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--wrapper-bg);
  backdrop-filter: blur(20px);
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 40px;
  margin: auto;
  z-index: 3;
  gap: 3rem;
`;

export const Header = styled('h1')`
  margin: 0;
  font-family: 'Lexend', sans-serif;
  font-weight: 300;
  font-size: 2rem;
  color: white;
  user-select: none;
`;

export const Light = styled('div')<LightProps>`
  position: fixed;
  width: 1px;
  height: 1px;
  top: ${({ $top }) => ($top ? $top + 'px' : 'initial')};
  left: ${({ $left }) => ($left ? $left + 'px' : 'initial')};
  right: ${({ $right }) => ($right ? $right + 'px' : 'initial')};
  bottom: ${({ $bottom }) => ($bottom ? $bottom + 'px' : 'initial')};
  box-shadow: 0 0
    ${({ $size }) => ($size === 'big' ? '420px 420px' : '280px 280px')}
    #ffffff6e;
  z-index: 3;
  border-radius: 50%;
`;

export const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const OtherWrapper = styled('div')`
  display: flex;
  gap: 1rem;
`;

export const OAuthWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
`;

export const Other = styled(Link)`
  margin: 0;
  padding: 0;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: white;
  transition: color 0.3s ease;
  user-select: none;

  &:hover {
    color: #afafaf;
  }
`;

export const PasswordInputWrapper = styled('div')`
  display: flex;
  position: relative;
  align-items: center;
`;

export const EmailInputWrapper = styled('div')<{ $message?: string }>`
  display: flex;
  position: relative;
  z-index: 99;
  background-color: transparent;

  &::after {
    content: '${({ $message }) => $message}';
    background-color: var(--warning);
    color: var(--warning-text);
    border: 1px solid var(--warning-border);
    padding: 0.5rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(20px);
    left: -100%;
    opacity: 0;
    z-index: -10;
    position: absolute;
    transition: 0.3s ease;
    cursor: help;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

export const OAuthMessage = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  flex-wrap: wrap;
  width: calc(340px - 1rem);
  background-color: var(--warning);
  border: 1px solid var(--warning-border);
`;
