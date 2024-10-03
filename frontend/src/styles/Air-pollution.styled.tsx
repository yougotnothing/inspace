import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 25px;
  width: 25rem;
  gap: 2.5rem;
  opacity: 0;
  margin-top: 17px;
`;

export const HeaderWrapper = styled('div')`
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: center;
`;
