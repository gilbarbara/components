import { MouseEvent, ReactElement } from 'react';
import { RequireAtLeastOne, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { ButtonProps } from '~/components/Button/Button';

import {
  DataAttributes,
  StyledProps,
  Variant,
  WithButtonSize,
  WithColorsDefaultBg,
  WithDisabled,
  WithHTMLAttributes,
  WithMargin,
} from '~/types';

export interface ButtonGroupKnownProps
  extends StyledProps,
    WithButtonSize,
    WithColorsDefaultBg,
    WithDisabled,
    WithHTMLAttributes,
    WithMargin {
  children?: ReactElement[];
  /**
   * The default variant for the buttons if you are using the `items` prop.
   * @default 'bordered'
   */
  defaultVariant?: Exclude<Variant, 'split'>;
  items: Array<
    | (ButtonProps &
        DataAttributes & {
          defaultSelected?: boolean;
        })
    | string
  >;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * The selected variant for the buttons if you are using the `items` prop.
   * @default 'solid'
   */
  selectedVariant?: Exclude<Variant, 'split'>;
}

export type ButtonGroupProps = Simplify<
  RequireAtLeastOne<ButtonGroupKnownProps, 'children' | 'items'>
>;

export const defaultProps = {
  bg: 'primary',
  defaultVariant: 'bordered',
  disabled: false,
  selectedVariant: 'solid',
  size: 'md',
} satisfies Omit<ButtonGroupProps, 'children'>;

export function useButtonGroup(props: ButtonGroupProps) {
  return useComponentProps(props, defaultProps);
}
