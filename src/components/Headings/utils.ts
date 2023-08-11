import { css } from '@emotion/react';

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
  ComponentProps,
  StyledProps,
  Typography,
  WithAlign,
  WithBorder,
  WithChildren,
  WithColor,
  WithLight,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface HeadingKnownProps
  extends StyledProps,
    WithAlign,
    WithBorder,
    WithColor,
    WithChildren,
    WithLight,
    WithMargin,
    Omit<WithTextOptions, 'bold' | 'size'> {}

export type HeadingProps = ComponentProps<HTMLHeadingElement, HeadingKnownProps>;
export type HeadingLargeProps = ComponentProps<
  HTMLHeadingElement,
  HeadingKnownProps & { large?: boolean }
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
    ${borderStyles(props)};
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props)};
  `;
}