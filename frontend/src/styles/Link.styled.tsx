import styled from 'styled-components';

export const Link = styled('a')`
  background-color: transparent;
  padding: 0;
  margin: 0;
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &:focus {
    opacity: 0.85;
  }
`;
