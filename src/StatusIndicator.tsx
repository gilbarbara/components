import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { rgba } from 'polished';

import { getColorVariant, getTheme, px } from './modules/helpers';
import { marginStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps, WithColor, WithMargin } from './types';

interface StatusIndicatorKnownProps extends StyledProps, WithMargin, WithColor {
  ratio?: number;
  size?: number;
}

export type StatusIndicatorProps = ComponentProps<HTMLDivElement, StatusIndicatorKnownProps>;

const StyledStatusIndicator = styled(
  'div',
  styledOptions,
)<StatusIndicatorProps>(props => {
  const { ratio = 0.7, shade, size = 20, variant = 'green' } = props;
  const { variants } = getTheme(props);
  const { bg } = getColorVariant(variant, shade, variants);

  const innerSize = size * ratio < size ? size * ratio : size;

  return css`
    ${marginStyles(props)};
    align-items: center;
    background-color: ${rgba(bg, 0.4)};
    border-radius: 50%;
    display: inline-flex;
    height: ${px(size)};
    justify-content: center;
    line-height: 1;
    width: ${px(size)};

    &:before {
      background-color: ${bg};
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
  ratio: 0.7,
  size: 20,
};
