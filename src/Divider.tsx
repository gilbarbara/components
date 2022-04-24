import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme, px } from './modules/helpers';
import { marginStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps, WithMargin } from './types';

export interface DividerKnownProps extends StyledProps, WithMargin {
  /** @default sm */
  size?: 'sm' | 'md' | 'lg';
  /** @default solid */
  type?: 'solid' | 'dashed' | 'dotted';
  /** @default 100% */
  width?: StringOrNumber;
}

export type DividerProps = ComponentProps<HTMLDivElement, DividerKnownProps>;

const sizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

const StyledDivider = styled(
  'div',
  styledOptions,
)<DividerProps>(props => {
  const { size = 'sm', type, width = '100%' } = props;
  const { grayLighter } = getTheme(props);
  const selectedSize = sizes[size];

  return css`
    border-bottom: ${selectedSize} ${type} ${grayLighter};
    ${marginStyles(props)};
    width: ${px(width)};
  `;
});

export function Divider(props: DividerProps): JSX.Element {
  return <StyledDivider data-component-name="Divider" {...props} />;
}

Divider.defaultProps = {
  size: 'sm',
  type: 'solid',
  width: '100%',
};
