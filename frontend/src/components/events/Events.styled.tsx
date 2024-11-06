import styled from 'styled-components';

export const Event = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 2rem;
`;

export const EventsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
