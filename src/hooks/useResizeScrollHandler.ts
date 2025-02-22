import { useEffect } from 'react';
import { useMemoizedValue } from '@gilbarbara/hooks';

export function useResizeScrollHandler(
  callback: () => void,
  skip: boolean = false,
  delay: number = 200,
) {
  const callbackMemo = useMemoizedValue(callback);

  useEffect(() => {
    if (skip) {
      return undefined;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const handleEvent = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(callbackMemo, delay);
    };

    window.addEventListener('resize', handleEvent);
    window.addEventListener('scroll', handleEvent, { passive: true });

    return () => {
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('scroll', handleEvent);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [callbackMemo, skip, delay]);
}
