import { FC } from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

export const LoadingWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: black;
  z-index: 99;
  top: 0;
  left: 0;
`;

export const Loader: FC<{ loading: boolean }> = ({ loading }) => (
  <LoadingWrapper>
    <MoonLoader loading={loading} color="#fff" size={50} />
  </LoadingWrapper>
);
