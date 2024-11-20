import { useCallback, useMemo } from 'react';
import { Self } from 'types/get-self';
import { Spotted } from 'types/spotted';

export const useSpottedKeys: (
  initialValue: Self | undefined
) => [Spotted[], (key: Spotted) => string | undefined] = (
  initialValue: Self | undefined
) => {
  const keys = useMemo(
    () =>
      Object.keys(initialValue?.getSelf || {}).filter(key =>
        key.includes('spotted')
      ) as Spotted[],
    [initialValue]
  );
  const transformKey = useCallback(
    (key: Spotted) =>
      key
        .match(/[A-Z]?[a-z]+/g)
        ?.splice(1)
        .map(word => word.toLowerCase())
        .join(' '),
    [keys]
  );

  return [keys, transformKey];
};
