import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, getStyledOptions, inputStyles } from './modules/system';
import {
  ComponentProps,
  InputTypes,
  StyledProps,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from './types';

export interface InputKnownProps
  extends StyledProps,
    WithBorderless,
    WithElementSpacing,
    WithFormElements {
  /** @default false */
  large?: boolean;
  placeholder?: string;
  /** @default text */
  type?: InputTypes;
}

export type InputProps = ComponentProps<
  HTMLInputElement,
  InputKnownProps,
  'name' | 'type' | 'width'
>;

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

  return <StyledInput ref={ref} data-component-name="Input" id={name} {...props} />;
});

Input.defaultProps = {
  borderless: false,
  disabled: false,
  large: false,
  prefixSpacing: false,
  readOnly: false,
  suffixSpacing: false,
  type: 'text',
  width: '100%',
};
