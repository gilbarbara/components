import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  ColorVariantTones,
  Orientation,
  Sizes,
  Spacing,
  SpacingOrZero,
  StyledProps,
  WithAlign,
  WithChildrenOptional,
  WithHTMLAttributes,
  WithMargin,
  WithTextOptions,
} from '~/types';

export type DividerProps = Simplify<DividerKnownProps>;

export interface DividerKnownProps
  extends StyledProps,
    WithAlign,
    WithChildrenOptional,
    WithHTMLAttributes,
    WithMargin,
    WithTextOptions {
  /** @default sm */
  borderSize?: Sizes;
  /** @default solid */
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * Component color
   * @default gray.200
   */
  color?: ColorVariantTones;
  /**
   * The distance between the text and borders
   *
   * @default xs
   */
  gap?: Spacing;
  /**
   * The width (for horizontal) or height (for vertical)
   *
   * @default 100%
   */
  length?: StringOrNumber;
  /**
   * The minimum border width for horizontal orientation with text
   *
   * @default 50
   */
  minBorderWidth?: StringOrNumber;
  /**
   * The orientation of the divider.
   * @default horizontal
   */
  orientation?: Orientation;
  /**
   * The divider margin
   * @default md
   */
  spacing?: SpacingOrZero | [start: SpacingOrZero, end: SpacingOrZero];
}

export const defaultProps = {
  ...textDefaultOptions,
  align: 'center',
  borderSize: 'sm',
  borderStyle: 'solid',
  color: 'gray.200',
  gap: 'xs',
  length: '100%',
  minBorderWidth: 50,
  orientation: 'horizontal',
  spacing: 'md',
} satisfies DividerProps;

export function useDivider(props: DividerProps) {
  return useComponentProps(props, defaultProps);
}
