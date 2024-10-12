import styled from 'styled-components';

export const Moon = styled('div')<{ $declination?: number }>`
  display: flex;
  width: 600px;
  height: 600px;
  align-items: center;
  justify-content: center;
  rotate: ${({ $declination }) =>
    $declination ? `${-$declination}deg` : 'none'};

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
  width: 1200px;
  margin-top: 6rem;
  align-self: center;
  position: relative;
`;
