import {
  ComponentProps,
  Direction,
  StyledProps,
  VariantWithTones,
  WithBorder,
  WithChildren,
  WithLayout,
  WithMargin,
  WithRadius,
  WithShadow,
} from '~/types';

export interface ListKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithLayout,
    WithMargin,
    WithRadius,
    WithShadow {
  /**
   * Component border color.
   * @default gray.100
   */
  borderColor?: VariantWithTones;
  /** @default vertical */
  direction?: Direction;
  /**
   * Add a border between items.
   * @default true
   */
  divider?: boolean;
  /** @default md */
  size?: 'sm' | 'md' | 'lg';
}

export type ListProps = ComponentProps<HTMLUListElement, ListKnownProps>;

export const defaultProps = {
  border: true,
  borderColor: 'gray.100',
  direction: 'vertical',
  divider: true,
  radius: 'xs',
  shadow: false,
  size: 'md',
} satisfies Omit<ListProps, 'children'>;
