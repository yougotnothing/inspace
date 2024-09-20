import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const Nav = styled('nav')`
  display: flex;
  position: fixed;
  z-index: 12;
  backdrop-filter: blur(5px);
  background-color: #54f8e244;
`;

export const Navbar = observer(() => {
  return <Nav></Nav>;
});
