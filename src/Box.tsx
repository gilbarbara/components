import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  backgroundStyles,
  baseStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  positioningStyles,
  radiusStyles,
  shadowStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithColor,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
} from './types';

export interface BoxKnownProps
  extends StyledProps,
    WithColor,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow {
  children?: ReactNode;
}

export type BoxProps = ComponentProps<HTMLDivElement, BoxKnownProps>;

export const StyledBox = styled(
  'div',
  getStyledOptions(),
)<BoxProps>(props => {
  return css`
    ${baseStyles(props)};
    ${backgroundStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${positioningStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledBox ref={ref} data-component-name="Box" {...rest}>
      {children}
    </StyledBox>
  );
});
