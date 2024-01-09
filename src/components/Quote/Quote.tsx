import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import { baseStyles, getStyledOptions, textStyles } from '~/modules/system';

import {
  HeadingSizes,
  OmitElementProps,
  Position,
  Sizes,
  SizesAll,
  Spacing,
  StyledProps,
  WithAccent,
  WithChildren,
  WithTextOptions,
} from '~/types';

type TextOptions = WithTextOptions<HeadingSizes | SizesAll>;

export interface QuoteKnownProps extends StyledProps, WithAccent, WithChildren, TextOptions {
  attribution?: ReactNode;
  /**
   * The distance between the quote and citation
   *
   * @default xs
   */
  attributionGap?: Spacing;
  /**
   * The font size of the citation
   *
   * @default sm
   */
  attributionSize?: TextOptions['size'];
  /**
   * The placement of the border
   *
   * @default left
   */
  border?: Position;
  /**
   * The size of the border
   *
   * @default sm
   */
  borderSize?: Sizes;
  /**
   * The distance between the border and content
   *
   * @default md
   */
  gap?: Spacing;
}

export type QuoteProps = Simplify<OmitElementProps<HTMLElement, QuoteKnownProps>>;

const borderSizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

export const defaultProps = {
  ...textDefaultOptions,
  accent: 'primary',
  attributionGap: 'md',
  attributionSize: 'sm',
  border: 'left',
  borderSize: 'md',
  gap: 'md',
  size: 'lg',
} satisfies Omit<QuoteProps, 'children'>;

export const StyledFigure = styled(
  'figure',
  getStyledOptions(),
)<SetRequired<Omit<QuoteProps, 'attribution' | 'children'>, 'accent' | 'borderSize' | 'gap'>>(
  props => {
    const { accent, border, borderSize, gap } = props;
    const { spacing, ...theme } = getTheme(props);

    const { mainColor } = getColorTokens(accent, null, theme);

    const styles: CSSObject = {};

    switch (border) {
      case 'bottom': {
        styles.borderBottom = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingBottom = px(spacing[gap]);

        break;
      }
      case 'left': {
        styles.borderLeft = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingLeft = px(spacing[gap]);

        break;
      }
      case 'right': {
        styles.borderRight = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingRight = px(spacing[gap]);

        break;
      }
      case 'top': {
        styles.borderTop = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingTop = px(spacing[gap]);
        break;
      }
      // no default
    }

    return css`
      ${baseStyles(props)};
      ${styles};
      display: flex;
      flex-direction: column;
      margin: 0;
    `;
  },
);

export const StyledQuote = styled(
  'blockquote',
  getStyledOptions(),
)<Omit<QuoteProps, 'attribution' | 'children'>>(props => {
  return css`
    ${baseStyles(props)};
    display: block;
    margin: 0;
    ${textStyles(props)};
  `;
});

const StyledAttribution = styled(
  'cite',
  getStyledOptions(),
)<{ gap: Spacing; size: TextOptions['size'] }>(props => {
  const { gap } = props;
  const { spacing } = getTheme(props);

  return css`
    display: flex;
    margin-top: ${spacing[gap]};
    ${textStyles(props)};
  `;
});

export const Quote = forwardRef<HTMLElement, QuoteProps>((props, ref) => {
  const { attribution, attributionGap, attributionSize, children, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <StyledFigure ref={ref} data-component-name="Quote" {...rest}>
      <StyledQuote {...rest}>{children}</StyledQuote>
      {attribution && (
        <StyledAttribution gap={attributionGap} size={attributionSize} theme={props.theme}>
          {attribution}
        </StyledAttribution>
      )}
    </StyledFigure>
  );
});

Quote.displayName = 'Quote';
