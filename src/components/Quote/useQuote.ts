import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { textDefaultOptions } from '~/modules/options';

import {
  HeadingSizes,
  Position,
  Sizes,
  Spacing,
  StyledProps,
  TextSizes,
  WithAccent,
  WithChildren,
  WithHTMLAttributes,
  WithMargin,
  WithTextOptions,
} from '~/types';

export type TextOptions = WithTextOptions<HeadingSizes | TextSizes>;

export interface QuoteKnownProps
  extends StyledProps,
    WithAccent,
    WithChildren,
    WithHTMLAttributes,
    WithMargin,
    TextOptions {
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

export type QuoteProps = Simplify<QuoteKnownProps>;

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

export function useQuote(props: QuoteProps) {
  return useComponentProps(props, defaultProps);
}
