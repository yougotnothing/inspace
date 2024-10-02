import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  border-radius: 24px;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
  gap: 2.5rem;
`;

export const LunarEmoji = styled('h1')`
  font-size: 4rem;
  user-select: none;
`;
