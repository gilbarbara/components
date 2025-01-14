import { LiteralUnion } from '@gilbarbara/types';

import * as theme from '../modules/theme';

import { MapLiteralToPrimitive } from './utils';

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

export type ColorVariant = Color | 'black' | 'white';

export type ColorVariantTones = LiteralUnion<
  | ColorVariant
  | keyof {
      [key in Color as `${key}.${ColorTone}`]: unknown;
    },
  string
>;

export type Radius = keyof typeof theme.radius;

export type Shadow = keyof typeof theme.shadow;

export type Spacing = keyof typeof theme.spacing;

export type Typography = keyof typeof theme.typography;

export interface Theme extends BaseTheme {}
