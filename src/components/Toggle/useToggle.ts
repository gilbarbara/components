import { AriaAttributes, ReactNode } from 'react';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  StyledProps,
  VariantWithTones,
  WithAccent,
  WithComponentSize,
  WithDisabled,
  WithHTMLAttributes,
  WithLabel,
  WithTheme,
} from '~/types';

export interface ToggleKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
    WithComponentSize,
    WithDisabled,
    WithHTMLAttributes,
    WithLabel {
  /** Status (controlled mode) */
  checked?: boolean;
  colorButton?: VariantWithTones | [unchecked: VariantWithTones, checked: VariantWithTones];
  colorTrack?: VariantWithTones;
  /**
   * Initial status (uncontrolled mode)
   * @default false
   */
  defaultChecked?: boolean;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  /**
   * The name for the input element, used when submitting an HTML form.
   */
  name?: string;
  /**
   * Callback when the status changes (uncontrolled mode)
   */
  onChange?: (value: boolean) => void;
  /**
   * Callback when clicking/key down the toggle
   */
  onToggle?: (value: boolean) => void;
  thumbIconChecked?: ReactNode;
  thumbIconUnchecked?: ReactNode;
}

export type ToggleProps = Simplify<ToggleKnownProps>;

export interface ToggleInnerProps
  extends SetRequired<Omit<ToggleProps, 'theme'>, 'accent' | 'size'>,
    Pick<ToggleProps, 'colorButton' | 'colorTrack'>,
    WithTheme {
  isChecked: boolean;
}

export const defaultProps = {
  accent: 'primary',
  defaultChecked: false,
  disabled: false,
  size: 'md',
} satisfies Omit<ToggleProps, 'label'>;

export function useToggle(props: ToggleProps) {
  return useComponentProps(props, defaultProps);
}
