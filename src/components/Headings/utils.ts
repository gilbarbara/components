import { css } from '@emotion/react';
import { Simplify } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import {
  alignStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  marginStyles,
  textStyles,
} from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  Typography,
  WithAlign,
  WithBorder,
  WithChildren,
  WithColors,
  WithLight,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface HeadingKnownProps
  extends StyledProps,
    WithAlign,
    WithBorder,
    Pick<WithColors, 'color'>,
    WithChildren,
    WithLight,
    WithMargin,
    Omit<WithTextOptions, 'bold' | 'size'> {}

export type HeadingProps = Simplify<OmitElementProps<HTMLHeadingElement, HeadingKnownProps>>;
export type HeadingLargeProps = Simplify<
  OmitElementProps<HTMLHeadingElement, HeadingKnownProps & { large?: boolean }>
>;

export const defaultProps = {
  light: false,
} satisfies Omit<HeadingProps, 'children'>;

export const jumboDefaultProps = {
  ...defaultProps,
  large: false,
} satisfies Omit<HeadingLargeProps, 'children'>;

export function getStyles(key: Typography, props: HeadingProps) {
  const { light } = props;
  const { fontFamily, fontWeights, typography } = getTheme(props);
  const selected = typography[key];

  return css`
    ${baseStyles(props)};
    font-family: ${fontFamily};
    font-size: ${selected.fontSize};
    font-weight: ${light ? fontWeights.normal : fontWeights.bold};
    line-height: ${selected.lineHeight};
    margin-bottom: 0.5em;
    margin-top: 0;
    ${alignStyles(props)};
    ${colorStyles(props)};
    ${borderStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props)};
  `;
}
