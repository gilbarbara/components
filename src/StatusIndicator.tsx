import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorVariant, getTheme, px } from './modules/helpers';
import { getStyledOptions, marginStyles } from './modules/system';
import { ComponentProps, Shades, StyledProps, WithColor, WithMargin } from './types';

interface StatusIndicatorKnownProps extends StyledProps, WithColor, WithMargin {
  /** @default lighter */
  centerShade?: Shades;
  ratio?: number;
  size?: number;
}

export type StatusIndicatorProps = ComponentProps<HTMLDivElement, StatusIndicatorKnownProps>;

const StyledStatusIndicator = styled(
  'div',
  getStyledOptions(),
)<StatusIndicatorProps>(props => {
  const { centerShade = 'lighter', ratio = 0.7, shade, size = 24, variant = 'green' } = props;
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
  return <StyledStatusIndicator data-component-name="StatusIndicator" {...props} />;
}

StatusIndicator.defaultProps = {
  centerShade: 'lighter',
  ratio: 0.7,
  shade: 'mid',
  size: 24,
  variant: 'green',
};
