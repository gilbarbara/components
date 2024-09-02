import { RefObject, useCallback, useEffect, useRef } from 'react';

const isBrowser = typeof window !== 'undefined';

export type ScrollValue = { x: number; y: number };

export interface UseScrollPositionOptions {
  /**
   * The callback function to be called when the scroll position changes.
   */
  callback?: ({ currPos, prevPos }: { currPos: ScrollValue; prevPos: ScrollValue }) => void;
  /**
   * The wait time in milliseconds before triggering the callback.
   * @default 30
   */
  delay?: number;
  /**
   * The element to track the scroll position for.
   */
  elementRef?: RefObject<HTMLElement> | null;
  /**
   * Whether the scroll position should be tracked or not.
   * @default true
   */
  isEnabled?: boolean;
}

function getScrollPosition(element: HTMLElement | undefined | null): ScrollValue {
  if (!isBrowser) {
    return { x: 0, y: 0 };
  }

  if (!element) {
    return { x: window.scrollX, y: window.scrollY };
  }

  return { x: element.scrollLeft, y: element.scrollTop };
}

export function useScrollPosition(props: UseScrollPositionOptions): ScrollValue {
  const { callback, delay = 30, elementRef, isEnabled } = props;

  const position = useRef<ScrollValue>(
    isEnabled ? getScrollPosition(elementRef?.current) : { x: 0, y: 0 },
  );

  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handler = useCallback(() => {
    const currentPos = getScrollPosition(elementRef?.current);

    if (typeof callback === 'function') {
      callback({ prevPos: position.current, currPos: currentPos });
    }

    position.current = currentPos;
    throttleTimeout.current = null;
  }, [callback, elementRef]);

  useEffect(() => {
    if (!isEnabled) {
      return () => {};
    }

    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }

        throttleTimeout.current = setTimeout(handler, delay);
      } else {
        handler();
      }
    };

    const target = elementRef?.current || window;

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [elementRef, delay, handler, isEnabled]);

  return position.current;
}
