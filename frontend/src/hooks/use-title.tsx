import { useEffect, useRef } from 'react';

export const useTitle = (
  title: string,
  prevailOnUnmount: boolean = false
): void => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
};
