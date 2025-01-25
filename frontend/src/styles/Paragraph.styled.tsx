import styled from 'styled-components';

export const Paragraph = styled('p')<{ $weight?: number; $color?: string }>`
  font-family: 'Fira Sans', sans-serif;
  font-weight: ${({ $weight }) => ($weight ? $weight : 300)};
  color: ${({ $color }) => ($color ? $color : 'white')};
  font-size: 1.3rem;
  margin: 0;
  width: max-content;
  text-align: start;
  user-select: none;
  -mox-user-select: none;
  -webkit-user-select: none;
`;
