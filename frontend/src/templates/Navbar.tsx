import { Link as A } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'styles/Link';

const Nav = styled('nav')`
  display: flex;
  position: fixed;
  z-index: 12;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 0.7rem;
  background-color: #3636361c;
  border-bottom: 1px solid #4747472f;
  width: 100svw;
  margin-bottom: 3rem;
`;

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 0.7rem;
  }
`;

const Routes = styled('div')`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Route = styled(A)`
  margin: 0;
  padding: 0;
  color: white;
  font-family: 'Fira Mono', sans-serif;
  font-weight: 300;
  user-select: none;
  font-size: 1rem;
  transition: 0.3s ease;

  &:hover {
    color: #b6b6b6;
  }

  &:active {
    color: #a1a1a1;
  }
`;

export const Navbar = ({ mappings }: { mappings: string[] }) => {
  return (
    <Nav>
      <Wrapper>
        <Link style={{ fontSize: '1.5rem' }}>☾</Link>
        <Routes>
          {mappings.map((mapping, index) => (
            <Route to={mapping} key={index}>
              {mapping.replace('/', '').replace('-', ' ')}
            </Route>
          ))}
        </Routes>
      </Wrapper>
    </Nav>
  );
};
