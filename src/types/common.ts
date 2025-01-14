import { CSSProperties, RefObject } from 'react';
import { SerializedStyles } from '@emotion/react';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardShorthandProperties } from 'csstype';

import { icons, inputTypes, sizes, textSizes } from '~/modules/options';

import { Breakpoint, ColorVariantTones } from './theme';
import { Concat } from './utils';

export type Alignment = 'left' | 'center' | 'right';

export type BorderItemSide =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'start'
  | 'end'
  | 'all'
  | Orientation;

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type DataAttributes = Record<`data-${string}`, StringOrNumber>;

export type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'jumbo';

export type Icons = (typeof icons)[number]['name'];

export type InputTypes = (typeof inputTypes)[number];
export type Orientation = 'horizontal' | 'vertical';

export type Placement = Concat<Position, 'start' | 'middle' | 'end'>;

export type Position = 'bottom' | 'left' | 'right' | 'top';

export type PositionX = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top';

export type PositionY = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type ResponsiveInput = {
  [key: ResponsiveSizes]: CSSProperties | SerializedStyles;
};

export type ResponsiveSizes = '_' | Breakpoint | string;

export type Sizes = (typeof sizes)[number];

export type SortDirection = 'asc' | 'desc';

export type StringLiteral = {} & string;

export type Target<T extends Element = Element> = RefObject<T> | T | null | string;

export type TextSizes = (typeof textSizes)[number];

export type Variant = 'bordered' | 'clean' | 'solid' | 'shadow';

export interface BorderItem {
  /**
   * @default gray.100
   */
  color?: ColorVariantTones;
  /**
   * @default all
   */
  side?: BorderItemSide;
  /**
   * @default 1px
   */
  size?: StandardShorthandProperties['borderWidth'] | number;
  /**
   * @default solid
   */
  style?: StandardShorthandProperties['borderStyle'];
}

// Responsive
export interface MediaQueries {
  [key: string]: any;

  _: string;
  lg: string;
  md: string;
  sm: string;
  xl: string;
  xs: string;
}
