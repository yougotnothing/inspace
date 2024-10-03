import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  border-radius: 24px;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
  backdrop-filter: blur(12px);
  gap: 2.5rem;
  opacity: 0;
  margin-top: 17px;
  position: relative;
  z-index: 9;
`;

export const LunarEmoji = styled('h1')`
  font-family: 'Noto Emoji', sans-serif;
  font-size: 4rem;
  margin: 0;
  padding: 0;
  user-select: none;
`;

export const Row = styled('div')`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

export const Phase = styled('h1')`
  font-weight: 500;
  font-family: 'Fira Mono', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0;
  padding: 0;
  user-select: none;
`;
