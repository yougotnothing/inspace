import styled from 'styled-components';

export const TransparentButton = styled('button')`
  background-color: transparent;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  padding: 0;
  margin: 0;
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  border: none;

  &:hover {
    color: #c7c7c7;
  }

  &:focus {
    opacity: 0.85;
  }
`;
