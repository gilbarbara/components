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
  StringLiteral,
  TextSizes,
  Variant,
} from './common';
import { ButtonSize, ColorVariantTones, Radius, Shadow, Spacing, Theme } from './theme';

export type Gap = Spacing | StringLiteral | number;

export type SpacingAuto = SpacingOrZero | 'auto';
export type SpacingOrZero = Spacing | 0;

export type WithHTMLAttributes<T = HTMLDivElement> = Pick<
  HTMLAttributes<T>,
  'className' | 'id' | 'style' | 'tabIndex' | 'title'
>;

export interface WithAccent<T = ColorVariantTones> {
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

export interface WithAnimationDuration {
  /**
   * The duration of the animation when the content is entering in milliseconds.
   * @default 300
   */
  animationEnterDuration?: number;
  /**
   * The duration of the animation when the content is exiting in milliseconds.
   * @default 300
   */
  animationExitDuration?: number;
}

export interface WithAnimationType extends WithAnimationDuration {
  /**
   * The type of animation to use for the transition.
   * - grow: Content expands from a small size (only works with 'down' and 'right' placements).
   * - scale: Content scales from a small size.
   * - slide: Content translates into view.
   *
   * @default slide
   */
  animationType?: 'grow' | 'scale' | 'slide';
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

export interface WithBusy {
  /**
   * Add an animated icon
   * @default false
   */
  busy?: boolean;
}

export interface WithButtonSize {
  /**
   * Button size
   * @default md
   */
  size?: ButtonSize;
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
  bg?: ColorVariantTones;
  /**
   * Component color
   */
  color?: ColorVariantTones;
}

export interface WithColorsDefaultBg extends WithColors {
  /** @default primary */
  bg?: ColorVariantTones;
}

export interface WithColorsDefaultColor extends WithColors {
  /** @default primary */
  color?: ColorVariantTones;
}

export interface WithComponentSize<T = Sizes> {
  /**
   * Component size
   * @default md
   */
  size?: T;
}

export interface WithDimension {
  aspectRatio?: StandardLonghandProperties['aspectRatio'];
  /**
   * Shorthand for `height`.
   * @note `height` takes precedence over `h` if both are defined.
   */
  h?: StandardLonghandProperties['height'] | number;
  height?: StandardLonghandProperties['height'] | number;
  /**
   * Shorthand for `maxHeight`.
   * @note `maxHeight` takes precedence over `maxH` if both are defined.
   */
  maxH?: StandardLonghandProperties['maxHeight'] | number;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  /**
   * Shorthand for `maxWidth`.
   * @note `maxWidth` takes precedence over `maxW` if both are defined.
   */
  maxW?: StandardLonghandProperties['maxWidth'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  /**
   * Shorthand for `minHeight`.
   * @note `minHeight` takes precedence over `minH` if both are defined.
   */
  minH?: StandardLonghandProperties['minHeight'] | number;
  minHeight?: StandardLonghandProperties['minHeight'] | number;
  /**
   * Shorthand for `minWidth`.
   * @note `minWidth` takes precedence over `minW` if both are defined.
   */
  minW?: StandardLonghandProperties['minWidth'] | number;
  minWidth?: StandardLonghandProperties['minWidth'] | number;
  /**
   * Shorthand for `width`.
   * @note `width` takes precedence over `w` if both are defined.
   */
  w?: StandardLonghandProperties['width'] | number;
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

export interface WithFlexBox
  extends Pick<StandardLonghandProperties, 'alignContent' | 'justifyItems'>,
    Pick<StandardShorthandProperties, 'placeContent' | 'placeItems'> {
  /**
   * How to align the contents along the cross axis.
   *
   * Any 'align-items' valid CSS value is accepted.
   */
  align?: StandardLonghandProperties['alignItems'];
  /**
   * How children are placed in the flex container.
   *
   * Any 'flex-direction' valid CSS value is accepted.
   */
  direction?: StandardLonghandProperties['flexDirection'];
  /**
   * The gap CSS property sets the gaps (gutters) between rows and columns.
   * It is a shorthand for row-gap and column-gap.
   */
  gap?: Gap;
  /**
   * How to align the contents along the main axis.
   *
   * Any 'justify-content' valid CSS value is accepted.
   */
  justify?: StandardLonghandProperties['justifyContent'];
  wrap?: StandardLonghandProperties['flexWrap'];
}

export interface WithFlexItem
  extends Pick<StandardLonghandProperties, 'alignSelf' | 'justifySelf' | 'order'> {
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
  columnGap?: Gap;
  columnStart?: StandardLonghandProperties['gridColumnStart'];
  grid?: StandardShorthandProperties['grid'];
  row?: StandardShorthandProperties['gridRow'];
  rowEnd?: StandardLonghandProperties['gridRowEnd'];
  rowGap?: Gap;
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

export interface WithInline {
  /**
   * Display as an inline element
   * @default false
   */
  inline?: boolean;
}

export interface WithLabel {
  label?: ReactNode;
}

export interface WithLayout extends WithDisplay, WithDimension {
  opacity?: StandardLonghandProperties['opacity'] | number;
  overflow?: StandardShorthandProperties['overflow'];
  pointerEvents?: StandardLonghandProperties['pointerEvents'];
  textAlign?: StandardLonghandProperties['textAlign'];
  transform?: StandardLonghandProperties['transform'];
  transformOrigin?: StandardLonghandProperties['transformOrigin'];
  transition?: StandardShorthandProperties['transition'];
  visibility?: StandardLonghandProperties['visibility'];
}

export interface WithLight {
  /**
   * Remove bold style
   */
  light?: boolean;
}

export interface WithMargin {
  /**
   * Shorthand for `margin`.
   * @note `margin` takes precedence over `m` if both are defined.
   */
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
  /**
   * Shorthand for `padding`.
   * @note `padding` takes precedence over `p` if both are defined.
   */
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

export interface WithTextSize<T = TextSizes> {
  /**
   * Text size
   */
  size?: T;
}

export interface WithTheme {
  theme: Theme;
}

export interface WithVariant<T extends string = Variant> {
  /**
   * Component variant
   * @default solid
   */
  variant?: T;
}
