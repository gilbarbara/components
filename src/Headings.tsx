import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { alignStyles, baseStyles, getStyledOptions, marginStyles } from './modules/system';
import { ComponentProps, StyledProps, TypographyItem, WithAlign, WithMargin } from './types';

export interface HeadingKnownProps extends StyledProps, WithAlign, WithMargin {
  children: ReactNode;
  light?: boolean;
}

export type HeadingProps = ComponentProps<HTMLHeadingElement, HeadingKnownProps>;
export type HeadingLargeProps = ComponentProps<
  HTMLHeadingElement,
  HeadingKnownProps & { large?: boolean }
>;

function getStyles(selected: TypographyItem, props: HeadingProps) {
  const { light } = props;
  const { fontFamily } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${alignStyles(props)};
    font-family: ${fontFamily};
    font-size: ${selected.fontSize};
    font-weight: ${light ? 400 : selected.weight};
    line-height: ${selected.lineHeight};
    margin-top: 0;
    ${marginStyles(props)};
  `;
}

export const StyledJumbo = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps>(props => {
  const { large } = props;
  const { typography } = getTheme(props);

  return getStyles(typography[large ? 'jumboLarge' : 'jumbo'], props);
});

export const StyledH1 = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title1, props);
});

export const StyledH2 = styled(
  'h2',
  getStyledOptions(),
)<HeadingProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title2, props);
});

export const StyledH3 = styled(
  'h3',
  getStyledOptions(),
)<HeadingProps>(props => {
  const { typography } = getTheme(props);

  return getStyles(typography.title3, props);
});

export const Jumbo = forwardRef<HTMLHeadingElement, HeadingLargeProps>((props, ref) => (
  <StyledJumbo ref={ref} data-component-name="Jumbo" {...props} />
));

Jumbo.displayName = 'Jumbo';

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH1 ref={ref} data-component-name="H1" {...props} />
));

H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH2 ref={ref} data-component-name="H2" {...props} />
));

H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH3 ref={ref} data-component-name="H3" {...props} />
));

H3.displayName = 'H3';
