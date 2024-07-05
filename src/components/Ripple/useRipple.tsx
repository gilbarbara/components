import React, { useCallback, useState } from 'react';
import { randomNumber } from '@gilbarbara/helpers';

export type RippleType = {
  key: React.Key;
  size: number;
  x: number;
  y: number;
};

export interface UseRippleProps {}

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const trigger = event.currentTarget;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();

    setRipples(previousRipples => [
      ...previousRipples,
      {
        key: Number(`${previousRipples.length}${randomNumber(0, 1000)}`),
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: React.Key) => {
    setRipples(previousState => previousState.filter(ripple => ripple.key !== key));
  }, []);

  return { ripples, onClick, onClear, ...props };
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
