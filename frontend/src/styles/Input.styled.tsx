import styled from 'styled-components';

export const Input = styled('input')`
  font-size: 1.2rem;
  padding: 0.5rem 0 0.5rem 0.7rem;
  border: 1px solid #838383;
  background-color: transparent;
  font-family: 'Fira Mono', sans-serif;
  width: 340px;
  outline: none;
  border-radius: 0.5rem;
  transition: 0.3s ease;

  &::placeholder {
    color: #838383;
  }

  &:active,
  &:focus {
    border-color: #fff;
  }

  &:invalid {
    border-color: #ff7a7a;
  }
`;
