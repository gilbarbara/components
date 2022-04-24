import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  backgroundStyles,
  baseStyles,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
  styledOptions,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithColor,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from './types';

export interface BoxKnownProps
  extends StyledProps,
    WithColor,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  children?: React.ReactNode;
}

export type BoxProps = ComponentProps<HTMLDivElement, BoxKnownProps>;

export const StyledBox = styled(
  'div',
  styledOptions,
)<BoxProps>(props => {
  return css`
    ${baseStyles(props)};
    ${backgroundStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledBox ref={ref} data-component-name="Box" {...rest}>
      {children}
    </StyledBox>
  );
});

Box.displayName = 'Box';
