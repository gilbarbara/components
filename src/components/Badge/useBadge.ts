import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithColors,
  WithComponentSize,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface BadgeKnownProps
  extends StyledProps,
    WithChildren,
    WithColors,
    WithComponentSize,
    WithMargin,
    WithPadding,
    WithRadius {
  /**
   * The border color of the badge.
   * if not set the badge will have a white border on light mode and a black border on dark mode.
   */
  borderColor?: VariantWithTones;
  /**
   * The content of the badge. The badge will be rendered relative to its children.
   */
  content?: ReactNode;
  /**
   * Render the badge as a dot.
   * @default false
   */
  dot?: boolean;
  /**
   * Hide the badge.
   * @default false
   */
  hideBadge?: boolean;
  /**
   * Hide the border around the badge.
   * @default false
   */
  hideBorder?: boolean;
  /**
   * The horizontal offset of the badge.
   * @default 0
   */
  offsetX?: number;
  /**
   * The vertical offset of the badge.
   * @default 0
   */
  offsetY?: number;
  /**
   * The placement of the badge.
   * @default top-right
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * The shape of the badge.
   * @default rectangle
   */
  shape?: 'circle' | 'rectangle';
}

export type BadgeProps = Simplify<BadgeKnownProps>;

export const defaultProps = {
  bg: 'primary',
  hideBorder: false,
  dot: false,
  hideBadge: false,
  placement: 'top-right',
  radius: 'sm',
  shape: 'rectangle',
  size: 'md',
} satisfies Omit<BadgeProps, 'children'>;

export function useBadge(props: BadgeProps) {
  return useComponentProps(props, defaultProps);
}
