import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import type { BoxProps } from '~/components/Box/useBox';

import {
  Orientation,
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithComponentSize,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithRadius,
  WithShadow,
  WithTheme,
} from '~/types';

export interface ListKnownProps
  extends StyledProps,
    WithChildren,
    WithComponentSize,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithRadius,
    WithShadow {
  /**
   * Component border color.
   * @default gray.100 (light mode) | gray.700 (dark mode)
   */
  borderColor?: VariantWithTones;
  /**
   * Hide the border of the component.
   * @default false
   */
  hideBorder?: boolean;
  /**
   * Hide the border between items.
   * @default false
   */
  hideDivider?: boolean;
  /**
   * The direction of the list.
   * @default vertical
   */
  orientation?: Orientation;
}

export type ListProps = Simplify<ListKnownProps>;

export interface ListItemProps
  extends BoxProps,
    Pick<ListProps, 'borderColor' | 'hideBorder' | 'hideDivider' | 'orientation' | 'size'> {}

export const defaultProps = {
  hideBorder: false,
  hideDivider: false,
  orientation: 'vertical',
  radius: 'xs',
  shadow: false,
  size: 'md',
} satisfies Omit<ListProps, 'children'>;

export function getBorderColor(props: Pick<ListProps, 'borderColor'> & WithTheme) {
  const {
    borderColor,
    theme: { darkMode },
  } = props;

  if (borderColor) {
    return borderColor;
  }

  return darkMode ? 'gray.700' : 'gray.100';
}

export function useList(props: ListProps) {
  return useComponentProps(props, defaultProps);
}

export function useListItem(props: ListItemProps) {
  return useComponentProps(props);
}
