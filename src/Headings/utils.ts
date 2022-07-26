import { css } from '@emotion/react';

import { getTheme } from '../modules/helpers';
import {
  alignStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  marginStyles,
} from '../modules/system';
import {
  ComponentProps,
  StyledProps,
  Typography,
  WithAlign,
  WithBorder,
  WithChildren,
  WithColor,
  WithMargin,
} from '../types';

export interface HeadingKnownProps
  extends StyledProps,
    WithAlign,
    WithBorder,
    WithColor,
    WithChildren,
    WithMargin {
  light?: boolean;
}

export type HeadingProps = ComponentProps<HTMLHeadingElement, HeadingKnownProps>;
export type HeadingLargeProps = ComponentProps<
  HTMLHeadingElement,
  HeadingKnownProps & { large?: boolean }
>;

export function getStyles(key: Typography, props: HeadingProps) {
  const { light } = props;
  const { fontFamily, typography } = getTheme(props);
  const selected = typography[key];

  return css`
    ${baseStyles(props)};
    font-family: ${fontFamily};
    font-size: ${selected.fontSize};
    font-weight: ${light ? 400 : selected.weight};
    line-height: ${selected.lineHeight};
    margin-bottom: 0.5em;
    margin-top: 0;
    ${alignStyles(props)};
    ${borderStyles(props)};
    ${colorStyles(props)};
    ${marginStyles(props)};
  `;
}
