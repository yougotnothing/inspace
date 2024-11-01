import styled from 'styled-components';
import { Route } from 'styles/Route';

const Nav = styled('nav')`
  display: flex;
  position: fixed;
  z-index: 12;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
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

export const Navbar = ({ mappings }: { mappings: string[] }) => {
  return (
    <Nav>
      <Wrapper>
        <Route style={{ fontSize: '1.5rem' }} to="/home">
          ☾
        </Route>
        <Routes>
          {mappings.map((mapping, index) => (
            <Route to={mapping} key={index}>
              {mapping
                .replace('/', '')
                .replace('-', ' ')
                .replace(/\?([^=&]+)=([^&]*)/, '')}
            </Route>
          ))}
        </Routes>
      </Wrapper>
    </Nav>
  );
};
