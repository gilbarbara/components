import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { boxStyles, getStyledOptions } from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColors,
  WithFlexBox,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
} from '~/types';

export interface BoxKnownProps
  extends StyledProps,
    WithBorder,
    WithChildrenOptional,
    WithColors,
    WithFlexBox,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow {
  /**
   * Set the display to flex.
   * @default false
   */
  flexBox?: boolean;
}

export type BoxProps<T = HTMLElement> = Simplify<OmitElementProps<T, BoxKnownProps>>;

export const StyledBox = styled(
  'div',
  getStyledOptions('fill'),
)<BoxProps>(props => {
  const { flexBox } = props;

  return css`
    display: ${flexBox ? 'flex' : undefined};
    ${boxStyles(props)};
  `;
});

export const boxDefaultProps = {
  flexBox: false,
} satisfies Omit<BoxProps, 'children'>;

/**
 * A container that lays out its contents using "block" (default) or "flex" (with the display prop).
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { getDataAttributes } = useTheme();

  return <StyledBox ref={ref} {...getDataAttributes('Box')} {...boxDefaultProps} {...props} />;
});

Box.displayName = 'Box';

export const boxCenterDefaultProps = {
  align: 'center',
  direction: 'column',
  display: 'flex',
  justify: 'center',
} satisfies Omit<BoxProps, 'children'>;

export const BoxCenter = forwardRef<HTMLDivElement, Omit<BoxProps, 'flexBox'>>((props, ref) => {
  const { getDataAttributes } = useTheme();

  return (
    <StyledBox
      ref={ref}
      {...getDataAttributes('BoxCenter')}
      {...boxCenterDefaultProps}
      {...props}
    />
  );
});

BoxCenter.displayName = 'BoxCenter';

export const boxInlineDefaultProps = {
  align: 'center',
  direction: 'row',
  display: 'inline-flex',
} satisfies Omit<BoxProps, 'children'>;

export const BoxInline = forwardRef<HTMLDivElement, Omit<BoxProps, 'flexBox'>>((props, ref) => {
  const { getDataAttributes } = useTheme();

  return (
    <StyledBox
      ref={ref}
      as="span"
      {...getDataAttributes('BoxInline')}
      {...boxInlineDefaultProps}
      {...props}
    />
  );
});

BoxInline.displayName = 'BoxInline';
