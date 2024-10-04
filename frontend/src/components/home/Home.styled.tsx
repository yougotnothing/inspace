import styled from 'styled-components';

export const Content = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 1200px;
  align-self: center;
  position: relative;
  padding: 7rem 0 3rem 0;
  height: 100svh;
`;

export const Events = styled('div')`
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
`;

export const EventsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  padding: 25px;
  border-radius: 24px;
  gap: 2.5rem;
  opacity: 0;
  margin-top: 17px;
`;

export const AirPollution = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 24px;
  padding: 25px;
  gap: 2.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--wrapper-bg);
`;

export const Shadow = styled('div')`
  background-color: #ffffff1f;
  display: flex;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  opacity: 0;
  z-index: 9;
`;
