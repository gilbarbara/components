import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  backgroundStyles,
  baseStyles,
  borderStyles,
  flexBoxStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  positioningStyles,
  radiusStyles,
  shadowStyles,
  textColorStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColor,
  WithFlexBox,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
  WithTextColor,
} from './types';

export interface BoxKnownProps
  extends StyledProps,
    WithBorder,
    WithChildrenOptional,
    WithColor,
    WithFlexBox,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow,
    WithTextColor {
  /**
   * Set the display to flex.
   * @default false
   */
  flexBox?: boolean;
}

export type BoxProps = ComponentProps<HTMLDivElement, BoxKnownProps>;

export const StyledBox = styled(
  'div',
  getStyledOptions('fill'),
)<BoxProps>(props => {
  const { flexBox } = props;

  return css`
    display: ${flexBox ? 'flex' : undefined};
    ${baseStyles(props)};
    ${backgroundStyles(props, false)};
    ${borderStyles(props)};
    ${flexBoxStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${positioningStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
    ${textColorStyles(props)};
  `;
});

/**
 * A container that lays out its contents using "block" (default) or "flex" (with the display prop).
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledBox ref={ref} data-component-name="Box" {...rest}>
      {children}
    </StyledBox>
  );
});

Box.defaultProps = {
  flexBox: false,
};

export const BoxCenter = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <StyledBox ref={ref} data-component-name="BoxCenter" {...props} />
));

BoxCenter.defaultProps = {
  align: 'center',
  direction: 'column',
  display: 'flex',
  justify: 'center',
};

export const BoxInline = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <StyledBox ref={ref} as="span" data-component-name="BoxInline" {...props} />
));

BoxInline.defaultProps = {
  align: 'center',
  direction: 'row',
  display: 'inline-flex',
};
