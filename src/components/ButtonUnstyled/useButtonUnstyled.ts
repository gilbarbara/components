import { ButtonHTMLAttributes } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  OmitElementProps,
  StyledProps,
  WithBorder,
  WithBusy,
  WithChildrenOptional,
  WithColors,
  WithDisplay,
  WithFlexBox,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithTextOptions,
} from '~/types';

export type ButtonUnstyledProps = Simplify<
  OmitElementProps<HTMLButtonElement, ButtonUnstyledKnownProps>
>;

export interface ButtonUnstyledKnownProps
  extends StyledProps,
    WithBorder,
    WithBusy,
    WithChildrenOptional,
    WithColors,
    WithDisplay,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithTextOptions {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const defaultProps = {
  ...textDefaultOptions,
  align: 'center',
  busy: false,
  disabled: false,
  type: 'button',
} satisfies Omit<ButtonUnstyledProps, 'children'>;

export function useButtonUnstyled(props: ButtonUnstyledProps) {
  return useComponentProps(props, defaultProps);
}
