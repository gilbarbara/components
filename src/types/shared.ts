import { ReactNode } from 'react';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import { Alignment, BorderItem, BorderItemSide, Direction, Sizes, TextSizes } from './common';
import { Radius, Shades, Shadow, Spacing, Theme, Variants } from './theme';

export interface WithAlign {
  /**
   * Text alignment
   */
  align?: Alignment;
}

export interface WithBlock {
  /**
   * Use the parent full width
   * @default false
   */
  block?: boolean;
}

export interface WithBorder {
  border?: boolean | BorderItemSide | BorderItem[];
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

export interface WithFlexBox {
  /**
   * How to align the contents along the cross axis.<br />
   * Any 'align-items' valid CSS value is accepted.
   */
  align?: StandardLonghandProperties['alignItems'];
  /**
   * How to align the contents when there is extra space in the cross axis.
   */
  alignContent?: StandardLonghandProperties['alignContent'];
  /**
   * How children are placed in the flex container.<br />
   * Any 'flex-direction' valid CSS value is accepted.
   */
  direction?: StandardLonghandProperties['flexDirection'];
  /**
   * How to align the contents along the main axis.<br />
   * Any 'justify-content' valid CSS value is accepted.
   */
  justify?: StandardLonghandProperties['justifyContent'];
  /**
   * Sets whether flex items are forced onto one line or can wrap onto multiple lines.
   */
  wrap?: StandardLonghandProperties['flexWrap'];
}

export interface WithFlexItem {
  /**
   * How to align along the cross axis when contained in a Box.
   */
  alignSelf?: StandardLonghandProperties['alignSelf'];
  /**
   * A fixed or relative size along its container's main axis.
   */
  basis?: StandardLonghandProperties['flexBasis'];
  /**
   * Set width and/or height to fill the container.
   */
  fill?: boolean | Direction;
  /**
   * Set flex-grow and/or flex-shrink.
   */
  flex?: boolean | 'grow' | 'shrink' | { grow: number; shrink: number };
  /**
   * Sets how the item is justified inside its container along the appropriate axis.
   */
  justifySelf?: StandardLonghandProperties['justifySelf'];
  /**
   * Sets the order to lay out an item in a flex container.
   */
  order?: StandardLonghandProperties['order'];
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
  mb?: Spacing | 0 | 'auto';
  /** margin-left */
  ml?: Spacing | 0 | 'auto';
  /** margin-right */
  mr?: Spacing | 0 | 'auto';
  /** margin-top */
  mt?: Spacing | 0 | 'auto';
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
  padding?: Spacing | 0;
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

export interface WithTextColor {
  color?: string;
  /**
   * Component shade
   * @default mid
   */
  colorShade?: Shades;
  /** Component color */
  colorVariant?: Variants;
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
