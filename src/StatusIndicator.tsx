import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired } from 'type-fest';

import { getColorVariant, getTheme, px } from './modules/helpers';
import { getStyledOptions, marginStyles } from './modules/system';
import { ComponentProps, Shades, StyledProps, WithColor, WithMargin } from './types';

export interface StatusIndicatorKnownProps extends StyledProps, WithColor, WithMargin {
  /** @default lighter */
  centerShade?: Shades;
  ratio?: number;
  size?: number;
}

export type StatusIndicatorProps = ComponentProps<HTMLDivElement, StatusIndicatorKnownProps>;

export const defaultProps = {
  centerShade: 'lighter',
  ratio: 0.7,
  shade: 'mid',
  size: 24,
  variant: 'green',
} satisfies StatusIndicatorProps;

const StyledStatusIndicator = styled(
  'div',
  getStyledOptions(),
)<SetRequired<StatusIndicatorProps, 'centerShade' | 'ratio' | 'size' | 'variant'>>(props => {
  const { centerShade, ratio, shade, size, variant } = props;
  const { variants } = getTheme(props);
  const { bg } = getColorVariant(variant, shade, variants);
  const { bg: centerBg } = getColorVariant(variant, centerShade, variants);

  const innerSize = size * ratio < size ? size * ratio : size;

  return css`
    align-items: center;
    background-color: ${bg};
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
