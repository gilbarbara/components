import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Orientation,
  Spacing,
  StyledProps,
  WithBorder,
  WithChildren,
  WithFlexItem,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export type SpacerProps = Simplify<SpacerKnownProps>;

export interface SpacerKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithFlexItem,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  /**
   * Distribution of the children in the spacer.
   * @default start
   */
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * The gap between the children.
   * @default sm
   */
  gap?: Spacing | [rowGap: Spacing, columnGap: Spacing];
  /**
   * Expand child width (Vertical only)
   * @default false
   */
  grow?: boolean;
  /**
   * The orientation of the spacer.
   * @default horizontal
   */
  orientation?: Orientation;
  /**
   * Reverse the order of the children.
   * @default false
   */
  reverse?: boolean;
  /**
   * The vertical alignment of the children.
   * @default center
   */
  verticalAlign?: 'center' | 'end' | 'start' | 'stretch';
  /**
   * Wrap the children if they don't fit in the container.
   * @default true
   */
  wrap?: boolean;
}

export const defaultProps = {
  orientation: 'horizontal',
  distribution: 'start',
  gap: 'sm',
  grow: false,
  reverse: false,
  shadow: false,
  verticalAlign: 'center',
  wrap: true,
} satisfies Omit<SpacerProps, 'children'>;

export function useSpacer(props: SpacerProps) {
  return useComponentProps(props, defaultProps);
}
