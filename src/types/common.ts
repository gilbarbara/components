import { CSSProperties, JSXElementConstructor } from 'react';
import { SerializedStyles } from '@emotion/react';

import { Breakpoints } from './theme';

import { icons, inputTypes, sizes, textSizes } from '../modules/options';

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type Icons = typeof icons[number];

export type InputTypes = typeof inputTypes[number];

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
