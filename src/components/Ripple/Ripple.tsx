import { Key } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { lighten } from 'colorizr';

import { useComponentProps } from '~/hooks/useComponentProps';
import { ripple } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { ColorVariantTones, WithTheme } from '~/types';

interface RippleType {
  key: Key;
  size: number;
  x: number;
  y: number;
}

export interface RippleProps {
  /**
   * The ripple color
   */
  color: ColorVariantTones;
  /**
   * Animation duration
   * @default 0.6s
   */
  duration?: string;
  onClear: (id: Key) => void;
  ripples: RippleType[];
}

export const defaultProps = {
  duration: '0.6s',
} satisfies Pick<RippleProps, 'duration'>;

export const StyledRipple = styled(
  'span',
  getStyledOptions(),
)<Required<Pick<RippleProps, 'color' | 'duration'>> & WithTheme>(props => {
  const { color, duration, theme } = props;
  const { mainColor } = getColorTokens(color, null, theme);

  return css`
    animation: ${ripple} ${duration} forwards;
    background-color: ${lighten(mainColor, 40)};
    border-radius: 50%;
    position: absolute;
    z-index: 0;
  `;
});

export function Ripple(props: RippleProps) {
  const {
    componentProps: { color, duration, onClear, ripples, theme },
    getDataAttributes,
  } = useComponentProps(props, defaultProps);

  return (
    <>
      {ripples.map(({ key, size, x, y }) => (
        <StyledRipple
          key={key}
          color={color}
          {...getDataAttributes('Ripple')}
          duration={duration}
          onAnimationEnd={() => onClear(key)}
          style={{
            height: px(size),
            left: px(x),
            top: px(y),
            width: px(size),
          }}
          theme={theme}
        />
      ))}
    </>
  );
}

Ripple.displayName = 'Ripple';
