import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify, ValueOf } from '@gilbarbara/types';

import { getStyledOptions, layoutStyles } from '~/modules/system';

import { WithChildren, WithLayout } from '~/types';

export interface ClickOutsideKnownProps extends WithChildren, WithLayout {
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

export const StyledClickOutside = styled(
  'div',
  getStyledOptions(),
)<Omit<ClickOutsideProps, 'active' | 'onClick'>>(props => {
  const { display } = props;

  return css`
    display: ${display && Object.values(DISPLAY).includes(display) ? display : undefined};
    ${layoutStyles(props)};
  `;
});

function ClickOutsideComponent(props: ClickOutsideProps) {
  const { active, children, onClick, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setReady] = useState(false);
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
    if (!isReady) {
      setReady(true);
    }

    if (active) {
      document.addEventListener('touchend', handleClick, true);
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('touchend', handleClick, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [active, handleClick, isReady]);

  return (
    <StyledClickOutside
      ref={containerRef}
      data-component-name="ClickOutside"
      data-ready={isReady}
      {...rest}
    >
      {children}
    </StyledClickOutside>
  );
}

export const ClickOutside = memo(ClickOutsideComponent);

ClickOutside.displayName = 'ClickOutside';
