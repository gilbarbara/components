import { memo, useCallback, useEffect, useRef } from 'react';
import { Simplify, ValueOf } from '@gilbarbara/types';

import { WithChildren } from '~/types';

export interface ClickOutsideKnownProps extends WithChildren {
  active: boolean;
  display?: ValueOf<typeof DISPLAY>;
  onClick: () => void;
}

export type ClickOutsideProps = Simplify<ClickOutsideKnownProps>;

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

  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
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
    },
    [onClick],
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('touchend', handleClick, true);
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('touchend', handleClick, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [active, handleClick]);

  const style =
    display !== DISPLAY.BLOCK && Object.values(DISPLAY).includes(display) ? { display } : undefined;

  return (
    <div ref={containerRef} data-component-name="ClickOutside" style={style} {...rest}>
      {children}
    </div>
  );
}

export const ClickOutsideMemo = memo(ClickOutside);

ClickOutsideMemo.displayName = 'ClickOutside';
