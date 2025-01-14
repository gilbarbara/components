import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithChildren,
  WithElementSpacing,
  WithFormElements,
  WithHeight,
} from '~/types';

export type SelectProps = Simplify<OmitElementProps<HTMLSelectElement, SelectKnownProps>>;

export interface SelectKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithChildren,
    WithElementSpacing,
    WithFormElements,
    WithHeight {}

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  height: 'md',
  multiple: false,
  prefixSpacing: false,
  suffixSpacing: false,
  width: '100%',
} satisfies Omit<SelectProps, 'children' | 'name'>;

export function useSelect(props: SelectProps) {
  return useComponentProps(props, defaultProps);
}
