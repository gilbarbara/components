import { LiteralUnion } from '@gilbarbara/types';

import { MapLiteralToPrimitive } from './utils';

import * as theme from '../modules/theme';

export type AvatarSize = keyof typeof theme.avatar;

export type BaseTheme = MapLiteralToPrimitive<typeof theme>;

export type Breakpoint = keyof typeof theme.breakpoints;

export type ButtonSize = keyof typeof theme.button;

export type Color = keyof typeof theme.colors;

export type ColorTone =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Radius = keyof typeof theme.radius;

export type Shadow = keyof typeof theme.shadow;

export type Spacing = keyof typeof theme.spacing;

export type Tone = keyof typeof theme.variants.primary;

export type Typography = keyof typeof theme.typography;

export type Variant = Color | 'black' | 'white';

export type VariantWithTones = LiteralUnion<
  | Variant
  | keyof {
      [key in Color as `${key}.${ColorTone}`]: unknown;
    },
  string
>;

export interface Theme extends BaseTheme {
  darkMode?: boolean;
}
