import { css } from '@emotion/react';
import { omit } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { alignStyles, getStyles } from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  Typography,
  WithAlign,
  WithBorder,
  WithChildren,
  WithColors,
  WithDisplay,
  WithLight,
  WithMargin,
  WithTextOptions,
  WithTheme,
} from '~/types';

export interface HeadingKnownProps
  extends StyledProps,
    WithAlign,
    WithBorder,
    Pick<WithColors, 'color'>,
    WithChildren,
    WithDisplay,
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

export function headingStyle(key: Typography, props: HeadingProps & WithTheme) {
  const { light, theme } = props;
  const { fontFamily, fontWeights, typography } = theme;
  const selected = typography[key];

  return css`
    font-family: ${fontFamily};
    font-size: ${selected.fontSize};
    font-weight: ${light ? fontWeights.normal : fontWeights.bold};
    line-height: ${selected.lineHeight};
    margin-bottom: 0.5em;
    margin-top: 0;
    ${alignStyles(props)};
    ${getStyles(omit(props, 'align'))};
  `;
}

export function useHeading(props: HeadingProps, type?: Typography) {
  return useComponentProps(props, type === 'jumbo' ? jumboDefaultProps : defaultProps);
}
