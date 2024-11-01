import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Route = styled(Link)`
  margin: 0;
  padding: 0;
  color: white;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  user-select: none;
  font-size: 1rem;
  transition: 0.3s ease;

  &:hover {
    color: #b6b6b6;
  }

  &:active {
    color: #a1a1a1;
  }
`;
