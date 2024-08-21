import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flexBoxStyles, getStyledOptions, layoutStyles } from '~/modules/system';

import { ClickOutsideProps, useClickOutside } from './useClickOutside';

export const StyledClickOutside = styled(
  'div',
  getStyledOptions(),
)<Omit<ClickOutsideProps, 'active' | 'onClick'>>(props => {
  const { display = 'inline-flex' } = props;

  return css`
    display: ${display};
    ${layoutStyles(props)};
    ${flexBoxStyles(props)};
  `;
});

function ClickOutsideComponent(props: ClickOutsideProps) {
  const { componentProps, getDataAttributes } = useClickOutside(props);
  const { active, children, onClick, ...rest } = componentProps;
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
      {...getDataAttributes('ClickOutside')}
      data-ready={isReady}
      {...rest}
    >
      {children}
    </StyledClickOutside>
  );
}

export const ClickOutside = memo(ClickOutsideComponent);

ClickOutside.displayName = 'ClickOutside';

export { type ClickOutsideProps } from './useClickOutside';
