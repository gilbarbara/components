import { Key } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { lighten } from 'colorizr';

import { ripple } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

import { VariantWithTones } from '~/types';

interface RippleType {
  key: Key;
  size: number;
  x: number;
  y: number;
}

/* eslint-disable react/no-unused-prop-types */
export interface RippleProps {
  /**
   * The ripple color
   */
  color: VariantWithTones;
  /**
   * Animation duration
   * @default 0.6s
   */
  duration?: string;
  onClear: (id: Key) => void;
  ripples: RippleType[];
}
/* eslint-enable react/no-unused-prop-types */

export const defaultProps = {
  duration: '0.6s',
} satisfies Pick<RippleProps, 'duration'>;

export const StyledRipple = styled(
  'span',
  getStyledOptions(),
)<Required<Pick<RippleProps, 'color' | 'duration'>>>(props => {
  const { color, duration } = props;
  const { white, ...theme } = getTheme(props);
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
  const { color, duration, onClear, ripples } = mergeProps(defaultProps, props);

  return (
    <>
      {ripples.map(({ key, size, x, y }) => (
        <StyledRipple
          key={key}
          color={color}
          duration={duration}
          onAnimationEnd={() => onClear(key)}
          style={{
            height: px(size),
            left: px(x),
            top: px(y),
            width: px(size),
          }}
        />
      ))}
    </>
  );
}
