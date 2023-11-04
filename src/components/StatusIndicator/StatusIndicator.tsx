import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { OmitElementProps, StyledProps, Tone, Variant, WithMargin } from '~/types';

export interface StatusIndicatorKnownProps extends StyledProps, WithMargin {
  /** Component color */
  color?: Variant | string;
  ratio?: number;
  size?: number;
  /** @default 100 */
  tone?: Tone;
}

export type StatusIndicatorProps = Simplify<
  OmitElementProps<HTMLDivElement, StatusIndicatorKnownProps>
>;

export const defaultProps = {
  color: 'green',
  tone: '100',
  ratio: 0.7,
  size: 24,
} satisfies StatusIndicatorProps;

const StyledStatusIndicator = styled(
  'div',
  getStyledOptions(),
)<SetRequired<StatusIndicatorProps, 'color' | 'ratio' | 'size' | 'tone'>>(props => {
  const { color, ratio, size, tone } = props;
  const { white, ...theme } = getTheme(props);
  const { mainColor, variant } = getColorTokens(color, null, theme);
  let centerBg: string;

  if (variant) {
    ({ mainColor: centerBg } = getColorTokens(`${variant}.${tone}`, null, theme));
  } else {
    centerBg = getColorWithTone(mainColor, tone);
  }

  const innerSize = size * ratio < size ? size * ratio : size;

  return css`
    align-items: center;
    background-color: ${mainColor};
    border-radius: 50%;
    display: inline-flex;
    height: ${px(size)};
    justify-content: center;
    line-height: 1;
    width: ${px(size)};
    ${marginStyles(props)};

    &:before {
      background-color: ${centerBg};
      border-radius: 50%;
      content: '';
      display: block;
      height: ${px(innerSize)};
      position: absolute;
      width: ${px(innerSize)};
    }
  `;
});

export function StatusIndicator(props: StatusIndicatorProps) {
  return (
    <StyledStatusIndicator data-component-name="StatusIndicator" {...defaultProps} {...props} />
  );
}

StatusIndicator.displayName = 'StatusIndicator';
