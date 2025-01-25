import { Paragraph } from 'styles/Paragraph';
import styled from 'styled-components';

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
