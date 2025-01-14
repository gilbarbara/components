import { MouseEvent, ReactElement, ReactNode } from 'react';
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

export type ButtonGroupProps = Simplify<
  RequireAtLeastOne<ButtonGroupKnownProps, 'children' | 'items'>
>;

export interface ButtonGroupItemProps
  extends Omit<ButtonProps, 'children' | 'id' | 'label'>,
    DataAttributes {
  /**
   * The unique identifier for the button.
   * If not provided, the label will be used.
   */
  id?: string | number;
  label: ReactNode;
}

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
   * Not used if you set the "selected" prop.
   */
  defaultSelected?: string | number;
  items: Array<ButtonGroupItemProps>;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * The selected variant for the buttons if you are using the `items` prop.
   * This makes the component controlled.
   */
  selected?: string | number;
  /**
   * The selected variant for the buttons if you are using the `items` prop.
   * @default 'solid'
   */
  selectedVariant?: Exclude<Variant, 'split'>;
  /**
   * The default variant for the buttons if you are using the `items` prop.
   * @default 'bordered'
   */
  unselectedVariant?: Exclude<Variant, 'split'>;
}

export const defaultProps = {
  bg: 'primary',
  disabled: false,
  selectedVariant: 'solid',
  size: 'md',
  unselectedVariant: 'bordered',
} satisfies Omit<ButtonGroupProps, 'children'>;

export function useButtonGroup(props: ButtonGroupProps) {
  return useComponentProps(props, defaultProps);
}
