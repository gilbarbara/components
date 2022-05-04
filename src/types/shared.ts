import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import { Sizes, TextSizes } from './common';
import { Radius, Shades, Shadow, Spacing, Theme, Variants } from './theme';

export interface WithAlign {
  /**
   * Text alignment
   * @default left
   */
  align?: 'left' | 'center' | 'right';
}

export interface WithBorderless {
  /** @default false */
  borderless?: boolean;
}

export interface WithColor {
  /**
   * Component shade
   * @default mid
   */
  shade?: Shades;
  /** Component color */
  variant?: Variants;
}

export interface WithComponentSize {
  /**
   * Component size
   * @default md
   */
  size?: Sizes;
}

export interface WithDisplay {
  display?: StandardLonghandProperties['display'];
}

export interface WithFilled {
  /**
   * Display as an inline element
   * @default false
   */
  filled?: boolean;
}

export interface WithFormElements extends WithBorderless {
  /** @default false */
  endSpacing?: boolean;
  /** @default false */
  startSpacing?: boolean;
  /** @default 100% */
  width?: StringOrNumber;
}

export interface WithInline {
  /**
   * Display as an inline element
   * @default false
   */
  inline?: boolean;
}

export interface WithInvert {
  /**
   * Invert background
   * @default false
   * */
  invert?: boolean;
}

export interface WithLayout extends WithDisplay {
  bottom?: StandardLonghandProperties['bottom'] | number;
  height?: StandardLonghandProperties['height'] | number;
  left?: StandardLonghandProperties['left'] | number;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  minHeight?: StandardLonghandProperties['minHeight'] | number;
  minWidth?: StandardLonghandProperties['minWidth'] | number;
  opacity?: StandardLonghandProperties['opacity'] | number;
  overflow?: StandardShorthandProperties['overflow'];
  pointerEvents?: StandardLonghandProperties['pointerEvents'];
  position?: StandardLonghandProperties['position'];
  right?: StandardLonghandProperties['right'] | number;
  textAlign?: StandardLonghandProperties['textAlign'];
  top?: StandardLonghandProperties['top'] | number;
  transform?: StandardLonghandProperties['transform'];
  transformOrigin?: StandardLonghandProperties['transformOrigin'];
  transition?: StandardShorthandProperties['transition'];
  width?: StandardLonghandProperties['width'] | number;
  zIndex?: StandardLonghandProperties['zIndex'] | number;
}

export interface WithMargin {
  margin?: Spacing | 0;
  mb?: Spacing | 0;
  ml?: Spacing | 0 | 'auto';
  mr?: Spacing | 0 | 'auto';
  mt?: Spacing | 0;
  mx?: Spacing | 0 | 'auto';
  my?: Spacing | 0;
}

export interface WithPadding {
  padding?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  pt?: Spacing;
  px?: Spacing;
  py?: Spacing;
}

export interface WithRadius {
  radius?: Radius;
}

export interface WithShadow {
  shadow?: Shadow;
}

export interface WithTextSize {
  /**
   * Text size
   * @default regular
   */
  size?: TextSizes;
}

export interface WithTextOptions extends WithTextSize {
  /**
   * Make the text bold
   * @default false
   */
  bold?: boolean;
}

export interface WithTheme {
  theme?: Partial<Theme>;
}

export interface WithTransparent {
  /**
   * Remove background and color
   * @default false
   */
  transparent?: boolean;
}
