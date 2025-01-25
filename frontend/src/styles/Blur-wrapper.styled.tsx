import styled from 'styled-components';

export const BlurWrapper = styled('div')<{
  $direction?: 'row' | 'column';
  $padding?: `${number}rem` | `${number}px` | `${number}%`;
  $top?: `${number}rem` | `${number}px` | `${number}%`;
}>`
  display: flex;
  padding: ${({ $padding }) => $padding || '1rem'};
  top: ${({ $top }) => $top || '17px'};
  flex-direction: ${({ $direction }) => $direction || 'column'};
  gap: 1rem;
  background-color: var(--wrapper-bg);
  border-radius: 1rem;
  opacity: 0;
  position: relative;
  border: 1px solid var(--border-color);
`;
