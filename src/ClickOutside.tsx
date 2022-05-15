import { memo, useEffect, useRef } from 'react';
import { ValueOf } from 'type-fest';

import { WithChildren } from './types';

export interface ClickOutsideProps extends WithChildren {
  active: boolean;
  display?: ValueOf<typeof DISPLAY>;
  onClick: () => void;
}

const DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  CONTENTS: 'contents',
} as const;

export function ClickOutside(props: ClickOutsideProps) {
  const { active, children, display = DISPLAY.BLOCK, onClick, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  const handleClick = useRef((event: MouseEvent | TouchEvent) => {
    const container = containerRef.current;

    if (event.type === 'touchend') {
      isTouch.current = true;
    }

    if (event.type === 'click' && isTouch.current) {
      return;
    }

    if (container && !container.contains(event.target as Node)) {
      onClick();
    }
  });

  useEffect(() => {
    const { current } = handleClick;

    if (active) {
      document.addEventListener('touchend', current, true);
      document.addEventListener('click', current, true);
    }

    return () => {
      document.removeEventListener('touchend', current, true);
      document.removeEventListener('click', current, true);
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      data-component-name="ClickOutside"
      style={
        display !== DISPLAY.BLOCK && Object.values(DISPLAY).includes(display)
          ? { display }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  );
}

export const ClickOutsideMemo = memo(ClickOutside);
