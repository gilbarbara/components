import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  InputTypes,
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
  WithHeight,
} from '~/types';

export interface InputKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithHeight,
    WithElementSpacing,
    WithFormElements {
  placeholder?: string;
  /** @default text */
  type?: InputTypes;
}

export type InputProps = Simplify<
  OmitElementProps<HTMLInputElement, InputKnownProps, 'name' | 'type' | 'width'>
>;

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  height: 'md',
  prefixSpacing: false,
  readOnly: false,
  suffixSpacing: false,
  type: 'text',
  width: '100%',
} satisfies Omit<InputProps, 'name'>;

export function useInput(props: InputProps) {
  return useComponentProps(props);
}
