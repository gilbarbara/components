import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  StyledProps,
  WithBorder,
  WithChildren,
  WithColors,
  WithFlexBox,
  WithFlexItem,
  WithGrid,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
} from '~/types';

export interface GridKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithColors,
    Omit<WithFlexBox, 'direction' | 'wrap'>,
    WithFlexItem,
    WithGrid,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow {
  display?: 'grid' | 'inline-grid';
}

export type GridProps = Simplify<GridKnownProps>;

export function useGrid(props: GridProps) {
  return useComponentProps(props);
}
