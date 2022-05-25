import { CSSProperties, JSXElementConstructor } from 'react';
import { SerializedStyles } from '@emotion/react';

import { Breakpoints } from './theme';

import { icons, inputTypes, sizes, textSizes } from '../modules/options';

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type Direction = 'horizontal' | 'vertical';

export type Icons = typeof icons[number];

export type InputTypes = typeof inputTypes[number];

export type PositionX = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top';

export type PositionY = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type Position = PositionX | PositionY;

export type Sizes = typeof sizes[number];

export type TextSizes = typeof textSizes[number];

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

export interface RecursiveChildrenMapOptions {
  filter?: JSXElementConstructor<any>;
  overrideProps?: boolean;
}

export type ResponsiveSizes = '_' | Breakpoints | string;

export type ResponsiveInput = {
  [key: ResponsiveSizes]: CSSProperties | SerializedStyles;
};
