import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';
import { Content } from './Home.styled';

export const Home = () => {
  return (
    <Wrapper>
      <Navbar mappings={['/profile', '/moon-phase', '/events']} />
      <Content></Content>
    </Wrapper>
  );
};
