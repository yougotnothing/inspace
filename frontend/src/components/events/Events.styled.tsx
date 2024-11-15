import styled from 'styled-components';

export const Body = styled('div')`
  display: flex;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 2rem;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  opacity: 0;
`;

export const BodyColumn = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
`;

export const EventsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding-bottom: 4rem;
`;

export const SearchSettings = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  gap: 1.3rem;
  align-items: flex-start;
  border-radius: 1.3rem;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  position: sticky;
  height: min-content;
  top: 7.3rem;
  opacity: 0;
`;

export const Bodies = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  align-items: stretch;
  top: 17px;
`;

export const Shadow = styled('div')`
  background-color: #ffffff1f;
  display: flex;
  border-radius: 50%;
  position: fixed;
  top: 50%;
  opacity: 0;
  z-index: 9;
`;
