import { Simplify, StringOrNumber } from '@gilbarbara/types';

import {
  OmitElementProps,
  Spacing,
  StyledProps,
  VariantWithTones,
  WithChildrenOptional,
  WithLayout,
  WithMargin,
  WithRadius,
} from '~/types';

export interface SkeletonKnownProps
  extends StyledProps,
    WithChildrenOptional,
    WithLayout,
    WithMargin,
    WithRadius {
  /**
   *
   * The accent color of the animation
   * @default white
   */
  accent?: VariantWithTones;
  /**
   * The animation delay in seconds
   * @default 0
   */
  animationDelay?: number;
  /**
   * The animation duration in seconds
   * @default 1.2
   */
  animationDuration?: number;
  /**
   * The appear duration in seconds
   * The animation only happens when isLoaded changes to true
   * @default 0.4
   */
  appearDuration?: number;
  /**
   * The background color of the animation
   * @default gray.50
   */
  bg?: VariantWithTones;
  /**
   *  Take the width of its children
   *  @default false
   */
  fitContent?: boolean;
  /**
   * Render the children when isLoaded is true
   */
  isLoaded?: boolean;
}

export type SkeletonProps = Simplify<OmitElementProps<HTMLDivElement, SkeletonKnownProps>>;

export type SkeletonTextProps = Simplify<
  Omit<SkeletonProps, 'fitContent'> & {
    /**
     * The spacing between lines
     * @default xs
     */
    gap?: Spacing;
    /**
     * The height of each line
     * @default 16
     */
    height?: StringOrNumber;
    /**
     * The number of lines to render
     * @default 3
     */
    lines?: number;
  }
>;

export type SkeletonCircleProps = Simplify<
  Omit<SkeletonProps, 'fitContent'> & {
    size: StringOrNumber;
  }
>;

export const baseDefaultProps = {
  accent: 'white',
  animationDelay: 0,
  animationDuration: 1.2,
  appearDuration: 0.4,
  bg: 'gray.50',
  isLoaded: false,
} satisfies SkeletonProps;
