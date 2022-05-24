import { ReactNode } from 'react';
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

export interface WithBlock {
  /**
   * Use the parent full width
   * @default false
   */
  block?: boolean;
}

export interface WithBorderless {
  /** @default false */
  borderless?: boolean;
}

export interface WithBusy {
  /**
   * Add an animated icon
   * @default false
   */
  busy?: boolean;
}

export interface WithChildren {
  /** Required */
  children: ReactNode;
}

export interface WithChildrenOptional {
  /** Optional */
  children?: ReactNode;
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

export interface WithElementSpacing {
  /** @default false */
  prefixSpacing?: boolean | StringOrNumber;
  /** @default false */
  suffixSpacing?: boolean | StringOrNumber;
}

export interface WithFilled {
  /**
   * Display as an inline element
   * @default false
   */
  filled?: boolean;
}

export interface WithFormElements {
  /** @default false */
  disabled?: boolean;
  name: string;
  /** @default false */
  readOnly?: boolean;
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
  height?: StandardLonghandProperties['height'] | number;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  minHeight?: StandardLonghandProperties['minHeight'] | number;
  minWidth?: StandardLonghandProperties['minWidth'] | number;
  opacity?: StandardLonghandProperties['opacity'] | number;
  overflow?: StandardShorthandProperties['overflow'];
  pointerEvents?: StandardLonghandProperties['pointerEvents'];
  textAlign?: StandardLonghandProperties['textAlign'];
  transform?: StandardLonghandProperties['transform'];
  transformOrigin?: StandardLonghandProperties['transformOrigin'];
  transition?: StandardShorthandProperties['transition'];
  width?: StandardLonghandProperties['width'] | number;
}

export interface WithMargin {
  /** Also accepts the shortcuts: mb (margin-bottom), ml, mr, mt, mx (margin horizontal), my (margin vertical) */
  margin?: Spacing | 0;
  /** margin-bottom */
  mb?: Spacing | 0;
  /** margin-left */
  ml?: Spacing | 0 | 'auto';
  /** margin-right */
  mr?: Spacing | 0 | 'auto';
  /** margin-top */
  mt?: Spacing | 0;
  /** margin horizontal axis */
  mx?: Spacing | 0 | 'auto';
  /** margin vertical axis */
  my?: Spacing | 0;
}

export interface WithOpen {
  /**
   * Controlled status
   */
  open?: boolean;
}

export interface WithPadding {
  /** Also accepts the shortcuts: pb (padding-bottom), pl, pr, pt, px (padding horizontal), py (padding vertical) */
  padding?: Spacing;
  /** padding-bottom */
  pb?: Spacing;
  /** padding-left */
  pl?: Spacing;
  /** padding-right */
  pr?: Spacing;
  /** padding-top */
  pt?: Spacing;
  /** padding horizontal axis */
  px?: Spacing;
  /** padding vertical axis */
  py?: Spacing;
}

export interface WithPositioning {
  bottom?: StandardLonghandProperties['bottom'] | number;
  left?: StandardLonghandProperties['left'] | number;
  position?: StandardLonghandProperties['position'];
  right?: StandardLonghandProperties['right'] | number;
  top?: StandardLonghandProperties['top'] | number;
  transform?: StandardLonghandProperties['transform'];
  zIndex?: StandardLonghandProperties['zIndex'] | number;
}

export interface WithRadius {
  radius?: Radius | false;
}

export interface WithShadow {
  shadow?: Shadow | false;
}

export interface WithTextSize {
  /**
   * Text size
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
