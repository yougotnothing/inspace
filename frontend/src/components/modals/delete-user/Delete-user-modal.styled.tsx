import styled from 'styled-components';
import { Button } from 'styles/Button';
import { Colors } from 'utils/colors.enum';

export const ModalWrapper = styled('button')<{ $isOpen: boolean }>`
  display: flex;
  position: fixed;
  z-index: ${({ $isOpen }) => ($isOpen ? 999 : -1)};
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0000006f;
  backdrop-filter: blur(10px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: 0.3s ease;
  border: none;
  padding: 0;
  margin: 0;
`;

export const WarningWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 2rem;
`;

export const TextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DeleteAccountButton = styled(Button)`
  &:hover {
    background-color: rgba(244, 67, 54, 0.27);
    border-color: ${Colors.RED};
    color: ${Colors.RED};
  }
`;
