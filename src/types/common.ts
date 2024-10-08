import { CSSProperties } from 'react';
import { SerializedStyles } from '@emotion/react';
import { validatePassword } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardShorthandProperties } from 'csstype';

import { icons, inputTypes, sizes, textSizes } from '~/modules/options';

import { Breakpoint, VariantWithTones } from './theme';
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

export interface BorderItem {
  /**
   * @default gray.100
   */
  color?: VariantWithTones;
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

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type DataAttributes = Record<`data-${string}`, StringOrNumber>;

export type Orientation = 'horizontal' | 'vertical';

export type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'jumbo';
export type TextSizes = (typeof textSizes)[number];

export type Icons = (typeof icons)[number]['name'];

export type InputTypes = (typeof inputTypes)[number];

export type Placement = Concat<Position, 'start' | 'middle' | 'end'>;

export type PositionX = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top';

export type PositionY = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type Position = 'bottom' | 'left' | 'right' | 'top';

export type Sizes = (typeof sizes)[number];

export type SortDirection = 'asc' | 'desc';

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

export type ResponsiveSizes = '_' | Breakpoint | string;

export type ResponsiveInput = {
  [key: ResponsiveSizes]: CSSProperties | SerializedStyles;
};

export type ValidatePasswordOptions = Parameters<typeof validatePassword>[1];
