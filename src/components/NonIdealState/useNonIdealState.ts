import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Icons,
  Orientation,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColors,
  WithComponentSize,
  WithFlexItem,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface NonIdealStateKnownProps
  extends StyledProps,
    WithBorder,
    WithColors,
    WithChildrenOptional,
    WithComponentSize,
    WithFlexItem,
    Omit<WithHTMLAttributes, 'title'>,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  description?: ReactNode;
  /** @default false */
  hideIcon?: boolean;
  icon?: Icons;
  /**
   * The orientation of the icon and text.
   * @default vertical
   */
  orientation?: Orientation;
  title?: ReactNode;
  /** @default not-found */
  type?: 'error' | 'no-results' | 'not-found' | 'offline' | null;
}

export type NonIdealStateProps = Simplify<NonIdealStateKnownProps>;

export const defaultProps = {
  hideIcon: false,
  maxWidth: '600px',
  orientation: 'vertical',
  padding: 'md',
  shadow: false,
  size: 'md',
  type: 'not-found',
} satisfies NonIdealStateProps;

export function useNonIdealState(props: NonIdealStateProps) {
  return useComponentProps(props, defaultProps);
}
