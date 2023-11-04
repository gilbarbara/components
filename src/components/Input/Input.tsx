import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions, inputStyles } from '~/modules/system';

import {
  InputTypes,
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from '~/types';

export interface InputKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithElementSpacing,
    WithFormElements {
  /** @default false */
  large?: boolean;
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
  large: false,
  prefixSpacing: false,
  readOnly: false,
  suffixSpacing: false,
  type: 'text',
  width: '100%',
} satisfies Omit<InputProps, 'name'>;

export const StyledInput = styled(
  'input',
  getStyledOptions(),
)<InputProps>(props => {
  return css`
    ${baseStyles(props)};
    ${inputStyles(props, 'input')};
  `;
});

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name } = props;

  return (
    <StyledInput ref={ref} data-component-name="Input" id={name} {...defaultProps} {...props} />
  );
});

Input.displayName = 'Input';
