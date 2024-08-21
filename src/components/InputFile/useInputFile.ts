import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { OmitElementProps, StyledProps, WithAccent, WithFormElements, WithHeight } from '~/types';

export interface InputFileKnownProps extends StyledProps, WithAccent, WithFormElements, WithHeight {
  /**
   * Solid color
   * @default false
   */
  solid?: boolean;
  value?: string;
}

export type InputFileProps = Simplify<
  OmitElementProps<HTMLInputElement, InputFileKnownProps, 'name' | 'type' | 'width'>
>;

export const defaultProps = {
  accent: 'primary',
  disabled: false,
  height: 'md',
  placeholder: 'Upload a file',
  readOnly: false,
  solid: false,
  width: '100%',
} satisfies Omit<InputFileProps, 'name'>;

export function useInputFile(props: InputFileProps) {
  return useComponentProps(props, defaultProps);
}
