import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme, px } from './modules/helpers';
import { baseStyles, getStyledOptions, inputStyles } from './modules/system';
import { ComponentProps, InputTypes, StyledProps, WithFormElements } from './types';

export interface InputKnownProps extends StyledProps, WithFormElements {
  /** @default false */
  large?: boolean;
  /** @default text */
  type?: InputTypes;
}

export type InputProps = ComponentProps<HTMLInputElement, InputKnownProps, 'type'>;

export const StyledInput = styled(
  'input',
  getStyledOptions(),
)<InputProps>(props => {
  const { borderless, endSpacing, large, startSpacing, width } = props;
  const { inputHeight, spacing } = getTheme(props);

  const paddingX = large ? spacing.md : spacing.sm;
  let paddingLeft = borderless ? 0 : spacing.md;
  let paddingRight = borderless ? 0 : spacing.md;

  if (endSpacing) {
    paddingRight = spacing.xxl;
  }

  if (startSpacing) {
    paddingLeft = spacing.xxl;
  }

  return css`
    ${baseStyles(props)};
    padding: ${paddingX} ${paddingRight} ${paddingX} ${paddingLeft};
    height: ${large ? inputHeight.large : inputHeight.normal};
    width: ${width ? px(width) : '100%'};
    ${inputStyles(props)};
  `;
});

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name } = props;

  return <StyledInput ref={ref} data-component-name="Input" id={name} {...props} />;
});

Input.defaultProps = {
  borderless: false,
  endSpacing: false,
  large: false,
  startSpacing: false,
  type: 'text',
  width: '100%',
};
Input.displayName = 'Input';
