import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  ButtonTypes,
  OmitElementProps,
  Spacing,
  StyledProps,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithEndContent,
  WithFlexItem,
  WithLight,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithStartContent,
  WithVariant,
} from '~/types';

export type ButtonProps = Simplify<OmitElementProps<HTMLButtonElement, ButtonKnownProps, 'wrap'>>;

export interface ButtonKnownProps
  extends StyledProps,
    WithBlock,
    WithBusy,
    WithButtonSize,
    WithChildren,
    WithColorsDefaultBg,
    WithEndContent,
    WithFlexItem,
    WithLight,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithStartContent,
    WithVariant {
  /**
   * Disable the button ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Space between the start and end content
   * @default xs
   */
  gap?: Spacing;
  /**
   * Whether the button should have the same width and height.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * A custom spinner icon to show when the button is busy.
   */
  spinner?: ReactNode;
  /**
   * The spinner position
   * @default end
   */
  spinnerPosition?: 'start' | 'end';
  /**
   * The button type
   * @default button
   */
  type?: ButtonTypes;
  /**
   * Double the horizontal padding
   * @default false
   */
  wide?: boolean;
}

export const defaultProps = {
  bg: 'primary',
  block: false,
  busy: false,
  disabled: false,
  disableRipple: false,
  gap: 'xs',
  iconOnly: false,
  light: false,
  size: 'md',
  spinnerPosition: 'end',
  type: 'button',
  variant: 'solid',
  wide: false,
} satisfies Omit<ButtonProps, 'children'>;

export function useButton(props: ButtonProps) {
  return useComponentProps(props, defaultProps);
}
