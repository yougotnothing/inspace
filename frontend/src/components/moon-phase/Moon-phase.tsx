import { Moon } from 'templates/Moon';
import { moonPhase } from 'store/moon-phase';
import { observer } from 'mobx-react-lite';

export const MoonPhase = observer(() => {
  return <Moon moonPhase={moonPhase.phase} hemisphere={moonPhase.hemisphere} />;
});
