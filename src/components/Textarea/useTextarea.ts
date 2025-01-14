import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from '~/types';

export type TextareaProps = Simplify<
  OmitElementProps<HTMLTextAreaElement, TextareaKnownProps, 'height' | 'name'>
>;

export interface TextareaKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithElementSpacing,
    WithFormElements {}

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  prefixSpacing: false,
  readOnly: false,
  rows: 3,
  suffixSpacing: false,
  width: '100%',
} satisfies Omit<TextareaProps, 'name'>;

export function useTextarea(props: TextareaProps) {
  return useComponentProps(props, defaultProps);
}
