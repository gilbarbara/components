import * as React from 'react';
import { ValueOf } from 'type-fest';

interface Props {
  active: boolean;
  children: React.ReactNode;
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

export function ClickOutside(props: Props) {
  const { active, children, display = DISPLAY.BLOCK, onClick, ...rest } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isTouch = React.useRef(false);

  const handleClick = React.useRef((event: MouseEvent | TouchEvent) => {
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

  React.useEffect(() => {
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

export const ClickOutsideMemo = React.memo(ClickOutside);
