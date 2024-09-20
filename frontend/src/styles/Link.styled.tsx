import styled from 'styled-components';

export const Link = styled('a')`
  background-color: transparent;
  padding: 0;
  margin: 0;
  color: #5858ff;
  outline: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    outline-color: #7d7dff;
    color: #7d7dff;
  }

  &:focus {
    outline-color: #3838ff;
    color: #3838ff;
  }
`;
