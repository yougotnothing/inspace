import { observer } from 'mobx-react-lite';
import { Wrapper } from 'styles/Wrapper';
import { Navbar } from 'templates/Navbar';

export const Home = observer(() => {
  return (
    <Wrapper>
      <Navbar></Navbar>
    </Wrapper>
  );
});
