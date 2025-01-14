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
  WithTextOptions,
} from '~/types';

export type FlexProps<T = HTMLElement> = Simplify<OmitElementProps<T, FlexKnownProps>>;

export interface FlexKnownProps
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
    WithShadow,
    WithTextOptions {}

export const flexDefaultProps = {
  display: 'flex',
} satisfies Omit<FlexProps, 'children'>;

export const flexCenterDefaultProps = {
  align: 'center',
  direction: 'column',
  display: 'flex',
  justify: 'center',
} satisfies Omit<FlexProps, 'children'>;

export const flexInlineDefaultProps = {
  align: 'center',
  as: 'span',
  direction: 'row',
  display: 'inline-flex',
} satisfies Omit<FlexProps, 'children'>;

export function useFlex(props: FlexProps, type?: 'Flex' | 'FlexCenter' | 'FlexInline') {
  let defaultProps: FlexProps = flexDefaultProps;

  if (type === 'FlexCenter') {
    defaultProps = flexCenterDefaultProps;
  } else if (type === 'FlexInline') {
    defaultProps = flexInlineDefaultProps;
  }

  return useComponentProps(props, defaultProps);
}
