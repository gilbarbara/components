import { HTMLAttributes, ReactNode } from 'react';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import {
  Alignment,
  BorderItem,
  BorderItemSide,
  HeadingSizes,
  Orientation,
  Sizes,
  TextSizes,
} from './common';
import { ButtonSize, Radius, Shadow, Spacing, Theme, VariantWithTones } from './theme';

export type SpacingOrZero = Spacing | 0;
export type SpacingAuto = SpacingOrZero | 'auto';

export interface WithAccent<T = VariantWithTones> {
  /**
   * Component accent color
   * @default primary
   */
  accent?: T;
}

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
  border?: boolean | BorderItemSide | BorderItem | BorderItem[];
}

export interface WithBorderless {
  /** @default false */
  borderless?: boolean;
}

export interface WithButtonSize {
  /**
   * Button size
   * @default md
   */
  size?: ButtonSize;
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

export interface WithColors {
  /**
   * Component background color
   */
  bg?: VariantWithTones;
  /**
   * Component color
   */
  color?: VariantWithTones;
}

export interface WithColorsDefaultBg extends WithColors {
  /** @default primary */
  bg?: VariantWithTones;
}

export interface WithColorsDefaultColor extends WithColors {
  /** @default primary */
  color?: VariantWithTones;
}

export interface WithComponentSize<T = Sizes> {
  /**
   * Component size
   * @default md
   */
  size?: T;
}

export interface WithDimension {
  height?: StandardLonghandProperties['height'] | number;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  minHeight?: StandardLonghandProperties['minHeight'] | number;
  minWidth?: StandardLonghandProperties['minWidth'] | number;
  width?: StandardLonghandProperties['width'] | number;
}

export interface WithDisabled {
  /** @default false */
  disabled?: boolean;
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

export interface WithEndContent {
  /**
   * Display some content after the main content.
   */
  endContent?: ReactNode;
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
   * The gap CSS property sets the gaps (gutters) between rows and columns.
   * It is a shorthand for row-gap and column-gap.
   */
  gap?: Spacing | ({} & string) | number;
  /**
   * How to align the contents along the main axis.<br />
   * Any 'justify-content' valid CSS value is accepted.
   */
  justify?: StandardLonghandProperties['justifyContent'];
  /**
   * How to align the contents when there is extra space in the main axis.
   */
  justifyItems?: StandardLonghandProperties['justifyItems'];
  /**
   * Sets whether flex items are forced onto one line or can wrap onto multiple lines.
   */
  placeContent?: StandardShorthandProperties['placeContent'];
  placeItems?: StandardShorthandProperties['placeItems'];
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
  fill?: boolean | Orientation;
  /**
   * Set flex-grow and/or flex-shrink.
   */
  flex?: boolean | 'grow' | 'shrink' | { grow?: number; shrink?: number };
  /**
   * Sets how the item is justified inside its container along the appropriate axis.
   */
  justifySelf?: StandardLonghandProperties['justifySelf'];
  /**
   * Sets the order to lay out an item in a flex container.
   */
  order?: StandardLonghandProperties['order'];
}

export interface WithFormElements extends WithDisabled {
  name: string;
  /** @default false */
  readOnly?: boolean;
  width?: StringOrNumber;
}

export interface WithGrid {
  area?: StandardShorthandProperties['gridArea'];
  autoColumns?: StandardLonghandProperties['gridAutoColumns'];
  autoFlow?: StandardLonghandProperties['gridAutoFlow'];
  autoRows?: StandardLonghandProperties['gridAutoRows'];
  column?: StandardShorthandProperties['gridColumn'];
  columnEnd?: StandardLonghandProperties['gridColumnEnd'];
  columnGap?: Spacing | ({} & string) | number;
  columnStart?: StandardLonghandProperties['gridColumnStart'];
  grid?: StandardShorthandProperties['grid'];
  row?: StandardShorthandProperties['gridRow'];
  rowEnd?: StandardLonghandProperties['gridRowEnd'];
  rowGap?: Spacing | ({} & string) | number;
  rowStart?: StandardLonghandProperties['gridRowStart'];
  template?: StandardShorthandProperties['gridTemplate'];
  templateAreas?: StandardLonghandProperties['gridTemplateAreas'];
  templateColumns?: StandardLonghandProperties['gridTemplateColumns'];
  templateRows?: StandardLonghandProperties['gridTemplateRows'];
}

export interface WithHeight {
  /**
   * Component height
   * @default md
   */
  height?: Sizes;
}

export type WithHTMLAttributes<T = HTMLDivElement> = Pick<
  HTMLAttributes<T>,
  'className' | 'id' | 'style' | 'tabIndex' | 'title'
>;

export interface WithInline {
  /**
   * Display as an inline element
   * @default false
   */
  inline?: boolean;
}

export interface WithLayout extends WithDisplay, WithDimension {
  opacity?: StandardLonghandProperties['opacity'] | number;
  overflow?: StandardShorthandProperties['overflow'];
  pointerEvents?: StandardLonghandProperties['pointerEvents'];
  textAlign?: StandardLonghandProperties['textAlign'];
  transform?: StandardLonghandProperties['transform'];
  transformOrigin?: StandardLonghandProperties['transformOrigin'];
  transition?: StandardShorthandProperties['transition'];
}

export interface WithLabel {
  label?: ReactNode;
}

export interface WithLight {
  /**
   * Remove bold style
   */
  light?: boolean;
}

export interface WithMargin {
  /** margin */
  m?: SpacingOrZero;
  /**
   * You can use the shortcuts: m (all sides), mb (bottom), ml (left), mr (right), mt (top), mx (left and right), my (top and bottom)
   */
  margin?: SpacingOrZero;
  /** margin-bottom */
  mb?: SpacingAuto;
  /** margin-left */
  ml?: SpacingAuto;
  /** margin-right */
  mr?: SpacingAuto;
  /** margin-top */
  mt?: SpacingAuto;
  /** margin horizontal axis */
  mx?: SpacingAuto;
  /** margin vertical axis */
  my?: SpacingOrZero;
}

export interface WithOpen {
  /**
   * Controlled status
   */
  open?: boolean;
}

export interface WithOutline
  extends Pick<Theme, 'outlineOffset' | 'outlineOpacity' | 'outlineWidth' | 'outlineZIndex'> {}

export interface WithPadding {
  p?: SpacingOrZero;
  /**
   * You can use the shortcuts: p (all sides), pb (bottom), pl (left), pr (right), pt (top), px (left and right), py (top and bottom)
   */
  padding?: SpacingOrZero;
  /** padding-bottom */
  pb?: SpacingOrZero;
  /** padding-left */
  pl?: SpacingOrZero;
  /** padding-right */
  pr?: SpacingOrZero;
  /** padding-top */
  pt?: SpacingOrZero;
  /** padding horizontal axis */
  px?: SpacingOrZero;
  /** padding vertical axis */
  py?: SpacingOrZero;
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
  radius?:
    | Radius
    | {
        bottom?: Radius;
        left?: Radius;
        right?: Radius;
        top?: Radius;
      };
}

export interface WithShadow {
  shadow?: Shadow | false;
}

export interface WithStartContent {
  /**
   * Display some content before the main content.
   */
  startContent?: ReactNode;
}

export interface WithTextSize<T = TextSizes> {
  /**
   * Text size
   */
  size?: T;
}

export interface WithTextOptions<T extends TextSizes | HeadingSizes = TextSizes>
  extends WithTextSize<T> {
  /**
   * Bold text
   * @default false
   */
  bold?: boolean;
  /**
   * Italic text
   * @default false
   */
  italic?: boolean;
  letterSpacing?: StandardLonghandProperties['letterSpacing'];
  lineHeight?: StandardLonghandProperties['lineHeight'];
  textDecoration?: StandardShorthandProperties['textDecoration'];
  textTransform?: StandardLonghandProperties['textTransform'];
  wordSpacing?: StandardLonghandProperties['wordSpacing'];
}

export interface WithTheme {
  theme: Theme;
}

export interface WithVariant {
  /**
   * Component variant
   * @default solid
   */
  variant?: 'bordered' | 'clean' | 'solid' | 'shadow';
}
