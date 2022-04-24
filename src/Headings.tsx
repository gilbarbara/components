import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { alignStyles, baseStyles, marginStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps, TypographyItem, WithAlign, WithMargin } from './types';

export interface HeadingKnownProps extends StyledProps, WithAlign, WithMargin {
  children: React.ReactNode;
  light?: boolean;
}

export type HeadingProps = ComponentProps<HTMLHeadingElement, HeadingKnownProps>;
export type HeadingBiggerProps = ComponentProps<
  HTMLHeadingElement,
  HeadingKnownProps & { bigger?: boolean }
>;

function getStyles(selected: TypographyItem, props: HeadingProps) {
  const { light } = props;
  const { fontFamily, spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${alignStyles(props)};
    font-family: ${fontFamily};
    font-size: ${selected.fontSize};
    font-weight: ${light ? 400 : selected.weight};
    letter-spacing: ${selected.letterSpacing};
    line-height: ${selected.lineHeight};
    margin-top: ${spacing.sm};
    ${marginStyles(props)};

    &:first-of-type {
      margin-top: 0;
    }
  `;
}

export const StyledJumbo = styled(
  'h1',
  styledOptions,
)<HeadingBiggerProps>(props => {
  const { bigger } = props;
  const { typography } = getTheme(props);

  return getStyles(typography[bigger ? 'jumboBigger' : 'jumbo'], props);
});

export const StyledH1 = styled(
  'h1',
  styledOptions,
)<HeadingBiggerProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title1, props);
});

export const StyledH2 = styled(
  'h2',
  styledOptions,
)<HeadingProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title2, props);
});

export const StyledH3 = styled(
  'h3',
  styledOptions,
)<HeadingProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title3, props);
});

export const Jumbo = React.forwardRef<HTMLHeadingElement, HeadingBiggerProps>((props, ref) => (
  <StyledJumbo ref={ref} data-component-name="Jumbo" {...props} />
));

Jumbo.displayName = 'Jumbo';

export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH1 ref={ref} data-component-name="H1" {...props} />
));

H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH2 ref={ref} data-component-name="H2" {...props} />
));

H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH3 ref={ref} data-component-name="H3" {...props} />
));

H3.displayName = 'H3';
