import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
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
  const mergedProps = mergeProps(defaultProps, props);

  return (
    <StyledInput ref={ref} data-component-name="Input" id={mergedProps.name} {...mergedProps} />
  );
});

Input.displayName = 'Input';
