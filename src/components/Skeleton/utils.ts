import { StringOrNumber } from '@gilbarbara/types';

import { grayLighter, grayLightest } from '../../modules/theme';
import {
  ComponentProps,
  Spacing,
  StyledProps,
  WithChildrenOptional,
  WithLayout,
  WithMargin,
  WithRadius,
} from '../../types';

export interface SkeletonKnownProps
  extends StyledProps,
    WithChildrenOptional,
    WithLayout,
    WithMargin,
    WithRadius {
  /**
   *
   * The color of the animated gradient
   * @default grayLightest
   */
  accentColor?: string;
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
   * The color at the animation end
   * @default grayLighter
   */
  baseColor?: string;
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

export type SkeletonProps = ComponentProps<HTMLDivElement, SkeletonKnownProps>;

export interface SkeletonTextProps extends Omit<SkeletonProps, 'fitContent'> {
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

export interface SkeletonCircleProps extends Omit<SkeletonProps, 'fitContent'> {
  size: StringOrNumber;
}

export const baseDefaultProps = {
  accentColor: grayLightest,
  animationDelay: 0,
  animationDuration: 1.5,
  appearDuration: 0.4,
  baseColor: grayLighter,
  fitContent: false,
  isLoaded: false,
} satisfies SkeletonProps;
