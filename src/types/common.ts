import { CSSProperties } from 'react';
import * as React from 'react';
import { SerializedStyles } from '@emotion/react';

import { Breakpoints } from './theme';

import { icons } from '../modules/icons';

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type Icons = typeof icons[number];

export type InputTypes =
  | 'color'
  | 'date'
  | 'email'
  | 'file'
  | 'hidden'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text';

export type Sizes = 'sm' | 'md' | 'lg';

export type TextSizes = 'small' | 'mid' | 'regular' | 'large';

export interface TypographyItem {
  fontSize: string | number;
  letterSpacing: string | number;
  lineHeight: string;
  weight: number | number[];
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

export interface RecursiveChildrenMapOptions {
  filter?: React.JSXElementConstructor<any>;
  overrideProps?: boolean;
}

export type ResponsiveSizes = '_' | Breakpoints | string;

export type ResponsiveInput = {
  [key: ResponsiveSizes]: CSSProperties | SerializedStyles;
};
