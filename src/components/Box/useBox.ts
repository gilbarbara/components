import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  OmitElementProps,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColors,
  WithFlexBox,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
} from '~/types';

export interface BoxKnownProps
  extends StyledProps,
    WithBorder,
    WithChildrenOptional,
    WithColors,
    WithFlexBox,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow {}

export type BoxProps<T = HTMLElement> = Simplify<OmitElementProps<T, BoxKnownProps>>;

export const defaultProps = {
  display: 'block',
} satisfies Omit<BoxProps, 'children'>;

export function useBox(props: BoxProps) {
  return useComponentProps(props, defaultProps);
}
