import { ViewIcon, ViewOffIcon } from 'hugeicons-react';
import { FC } from 'react';
import styled from 'styled-components';

const Button = styled('button')`
  position: absolute;
  right: 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
`;

export const EyeToggle: FC<{
  type: 'password' | 'text';
  setType: () => void;
}> = ({ type, setType }) => {
  return (
    <Button onClick={setType}>
      {type === 'password' ? (
        <ViewOffIcon color="white" size={24} />
      ) : (
        <ViewIcon color="white" size={24} />
      )}
    </Button>
  );
};
