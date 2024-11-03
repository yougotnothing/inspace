import styled from 'styled-components';

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  padding: 2rem;
  border-radius: 2rem;
  background-color: var(--wrapper-bg);
  border: 1px solid var(--border-color);
`;

export const Message = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  font-family: 'Fira Mono', sans-serif;
  color: white;
  margin: 0;
  padding: 0;
`;

export const Header = styled('h1')`
  font-size: 2.5rem;
  font-weight: 600;
  font-family: 'Lexend', sans-serif;
  color: white;
  margin: 0;
  padding: 0;
  text-align: center;
`;
