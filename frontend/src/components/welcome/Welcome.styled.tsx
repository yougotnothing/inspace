import styled from 'styled-components';

export const Starfield = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100svw;
  height: 100svh;
  background-color: black;
  position: relative;
  place-content: center;
`;

export const Wrapper = styled('div')`
  display: flex;
  backdrop-filter: blur(7px);
  border: 1px solid #868686;
  background-color: #00000013;
  justify-content: space-between;
  position: absolute;
  border-radius: 24px;
  width: 50%;
  height: 60%;
  opacity: 0;
  overflow: hidden;
`;

export const TextWrapper = styled('div')<{ $place: 'flex-start' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $place }) => $place};
  background-color: translarent;
  gap: 3rem;
  width: 50%;
  padding: 20px;
`;

export const Links = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  position: relative;
  justify-self: flex-end;
  margin-top: auto;
`;

export const Categories = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
`;
