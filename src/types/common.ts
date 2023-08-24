import { CSSProperties, JSXElementConstructor } from 'react';
import { SerializedStyles } from '@emotion/react';
import { validatePassword } from '@gilbarbara/helpers';
import { StandardShorthandProperties } from 'csstype';

import { Breakpoint, VariantWithTones } from './theme';

import { icons, inputTypes, sizes, textSizes } from '../modules/options';

export type Alignment = 'left' | 'center' | 'right';

export type BorderItemSide =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'start'
  | 'end'
  | 'all'
  | Direction;

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

export type Direction = 'horizontal' | 'vertical';

export type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'jumbo';

export type Icons = (typeof icons)[number]['name'];

export type InputTypes = (typeof inputTypes)[number];

export type Placement = 'bottom' | 'left' | 'right' | 'top';

export type PositionX = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top';

export type PositionY = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type Position = PositionX | PositionY;

export type Sizes = (typeof sizes)[number];

export type SortDirection = 'asc' | 'desc';

export type TextSizes = (typeof textSizes)[number];

// Responsive
export interface MediaQueries {
  [key: string]: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  _: string;
  lg: string;
  md: string;
  sm: string;
  xl: string;
  xs: string;
}

export interface RecursiveChildrenEnhancerOptions {
  componentType?: JSXElementConstructor<any>;
  overrideProps?: boolean;
}

export type ResponsiveSizes = '_' | Breakpoint | string;

export type ResponsiveInput = {
  [key: ResponsiveSizes]: CSSProperties | SerializedStyles;
};

export type ValidatePasswordOptions = Parameters<typeof validatePassword>[1];
