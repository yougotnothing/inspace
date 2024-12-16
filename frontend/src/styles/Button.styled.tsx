import styled from 'styled-components';

export const Button = styled('button')<{ $marginTop?: 'auto' }>`
  background-color: white;
  color: black;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  padding: 0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  margin-left: ${({ $marginTop }) => ($marginTop ? $marginTop : '0')};
  margin-right: ${({ $marginTop }) => ($marginTop ? $marginTop : '0')};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop : '0')};
  user-select: none;

  &:hover {
    border-color: white;
    background-color: black;
    color: white;
  }
`;
