import { Simplify } from '@gilbarbara/types';

import { isDarkMode } from '~/modules/system';

import {
  Direction,
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithRadius,
  WithShadow,
} from '~/types';

export interface ListKnownProps
  extends StyledProps,
    WithChildren,
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
  /** @default vertical */
  direction?: Direction;
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
  /** @default md */
  size?: 'sm' | 'md' | 'lg';
}

export type ListProps = Simplify<ListKnownProps>;

export function getBorderColor<T extends Pick<ListProps, 'borderColor' | 'theme'>>(props: T) {
  const { borderColor } = props;
  const darkMode = isDarkMode(props);

  if (borderColor) {
    return borderColor;
  }

  return darkMode ? 'gray.700' : 'gray.100';
}
