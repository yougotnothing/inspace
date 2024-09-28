import styled from 'styled-components';

export const Link = styled('a')`
  background-color: transparent;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
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
