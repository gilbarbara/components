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
} from '~/modules/system';

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
} from '~/types';

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

export const boxDefaultProps = {
  flexBox: false,
} satisfies Omit<BoxProps, 'children'>;

/**
 * A container that lays out its contents using "block" (default) or "flex" (with the display prop).
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <StyledBox ref={ref} data-component-name="Box" {...boxDefaultProps} {...props} />
));

Box.displayName = 'Box';

export const boxCenterDefaultProps = {
  align: 'center',
  direction: 'column',
  display: 'flex',
  justify: 'center',
} satisfies Omit<BoxProps, 'children'>;

export const BoxCenter = forwardRef<HTMLDivElement, Omit<BoxProps, 'flexBox'>>((props, ref) => (
  <StyledBox ref={ref} data-component-name="BoxCenter" {...boxCenterDefaultProps} {...props} />
));

BoxCenter.displayName = 'BoxCenter';

export const boxInlineDefaultProps = {
  align: 'center',
  direction: 'row',
  display: 'inline-flex',
} satisfies Omit<BoxProps, 'children'>;

export const BoxInline = forwardRef<HTMLDivElement, Omit<BoxProps, 'flexBox'>>((props, ref) => (
  <StyledBox
    ref={ref}
    as="span"
    data-component-name="BoxInline"
    {...boxInlineDefaultProps}
    {...props}
  />
));

BoxInline.displayName = 'BoxInline';
