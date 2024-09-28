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
  background-color: #4747472f;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  height: 40%;
  width: 25%;
  border: 1px solid #868686;
  border-radius: 24px;
  padding: 20px;
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

export const Other = styled(Link)`
  margin: 0;
  padding: 0;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #afafaf;
  }
`;
