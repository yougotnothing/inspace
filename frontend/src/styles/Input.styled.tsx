import styled from 'styled-components';

export const Input = styled('input')<{
  $isInvalid?: boolean;
  $message?: string;
}>`
  font-size: 1.2rem;
  padding: 0.5rem 0 0.5rem 0.7rem;
  border: 1px solid ${({ $isInvalid }) => (!$isInvalid ? '#838383' : '#ff7a7a')};
  background-color: transparent;
  font-family: 'Fira Mono', sans-serif;
  width: 340px;
  outline: none;
  border-radius: 0.5rem;
  transition: 0.3s ease;

  &::placeholder {
    user-select: none;
    color: #838383;
  }

  &:active,
  &:focus {
    border-color: #fff;
  }

  &:invalid {
    border-color: #ff7a7a;
  }

  &:read-only {
    cursor: help;
    border-color: var(--warning-border);
    color: var(--warning-text);
  }
`;
