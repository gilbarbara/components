import { ChangeEventHandler, FocusEventHandler } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithFormElements,
  WithHeight,
} from '~/types';

export type InputColorProps = Simplify<
  OmitElementProps<HTMLInputElement, InputColorKnownProps, 'name' | 'type' | 'width'>
>;

export interface InputColorKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithFormElements,
    WithHeight {
  /**
   * Get the value only when the color picker is closed.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Get the color when the color changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Debounce onChange event in milliseconds.
   * Set it to 0 for real-time events.
   * @default 250
   */
  onChangeDebounce?: number;
  placeholder?: string;
  /**
   * A 7-character string specifying an RGB color in hexadecimal format.
   */
  value?: string;
}

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  height: 'md',
  onChangeDebounce: 250,
  placeholder: 'Select a color',
  readOnly: false,
  width: 'auto',
} satisfies Omit<InputColorProps, 'name'>;

export function useInputColor(props: InputColorProps) {
  return useComponentProps(props, defaultProps);
}
