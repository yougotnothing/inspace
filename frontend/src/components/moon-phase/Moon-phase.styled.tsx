import styled from 'styled-components';

export const Moon = styled('div')`
  display: flex;
  width: 600px;
  height: 600px;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: relative;
  top: 17px;

  & > canvas {
    width: 600px !important;
    height: 600px !important;
    margin: 0;
  }
`;

export const HeaderWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin-top: 4rem;
  align-self: center;
  position: relative;
`;

export const HeaderInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: 2rem;
  margin-top: 4rem;
  width: 50%;
`;

export const MoonPhaseInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  width: 100%;
  border-radius: 1rem;
`;

export const Row = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled('h2')`
  font-size: 2.4rem;
  font-weight: 600;
  font-family: 'Lexend', sans-serif;
  color: white;
  margin: 0;
  padding: 0;
`;

export const Info = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1.3rem;
  opacity: 0;
  position: relative;
  top: 17px;
`;

export const Light = styled('div')`
  box-shadow: 0 0 180px 180px #ffffff1f;
  position: absolute;
  place-self: center;
  top: 50%;
  border-radius: 50%;
  opacity: 0;
`;
