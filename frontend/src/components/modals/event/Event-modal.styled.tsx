import styled from 'styled-components';
import { Paragraph } from 'styles/Paragraph';

export const ModalWrapper = styled('button')<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100svw;
  height: 100svh;
  background-color: #00000021;
  border: none;
  backdrop-filter: blur(20px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  z-index: ${({ $isOpen }) => ($isOpen ? 999 : -1)};
  transition: 0.3s ease;
`;

export const EventWrapper = styled('div')`
  display: flex;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  gap: 5rem;
`;

export const EventColumn = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;

export const FieldHelperParagraph = styled(Paragraph)<{ $content: string }>`
  position: relative;
  cursor: help;

  &::before {
    content: '${({ $content }) => $content}';
    background-color: #000000dc;
    border: 1px solid var(--border-color);
    padding: 0.4rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    overflow: auto;
    top: -2rem;
    transition: 0.3s ease;
    z-index: -1;
    pointer-events: none;
  }

  &:hover {
    &::before {
      z-index: 999;
      opacity: 1;
      pointer-events: auto;
    }
  }
`;
