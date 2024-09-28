import styled from 'styled-components';

export const Paragraph = styled('p')<{ $weight?: number }>`
  font-family: 'Fira Sans', sans-serif;
  font-weight: ${({ $weight }) => ($weight ? $weight : 300)};
  color: white;
  font-size: 1.3rem;
  margin: 0;
  user-select: none;
  -mox-user-select: none;
  -webkit-user-select: none;
`;
