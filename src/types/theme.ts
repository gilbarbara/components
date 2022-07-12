import { MapLiteralToPrimitive } from './utils';

import * as theme from '../modules/theme';

export type BaseTheme = MapLiteralToPrimitive<typeof theme>;

export type Breakpoints = keyof typeof theme.breakpoints;

export type Colors = keyof typeof theme.colors;

export type Radius = keyof typeof theme.radius;

export type Shades = keyof typeof theme.variants.primary;

export type Shadow = keyof typeof theme.shadow;

export type Spacing = keyof typeof theme.spacing;

export type Typography = keyof typeof theme.typography;

export type ColorVariants = keyof typeof theme.colors | 'gray';

export type Variants = ColorVariants | 'black' | 'white';

export interface Theme extends BaseTheme {
  darkMode?: boolean;
}
