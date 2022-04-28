import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme, px } from './modules/helpers';
import { baseStyles, inputStyles, styledOptions } from './modules/system';
import { ComponentProps, InputTypes, StyledProps, WithFormElements } from './types';

export interface InputKnownProps extends StyledProps, WithFormElements {
  /** @default false */
  bigger?: boolean;
  /** @default text */
  type?: InputTypes;
}

export type InputProps = ComponentProps<HTMLInputElement, InputKnownProps>;

export const StyledInput = styled(
  'input',
  styledOptions,
)<InputProps>(props => {
  const { bigger, borderless, endSpacing, startSpacing, width } = props;
  const { inputHeight, spacing } = getTheme(props);

  const paddingX = bigger ? spacing.md : spacing.sm;
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
    ${inputStyles(props)};
    padding: ${paddingX} ${paddingRight} ${paddingX} ${paddingLeft};
    height: ${bigger ? inputHeight.md : inputHeight.sm};
    width: ${width ? px(width) : '100%'};
  `;
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name } = props;

  return <StyledInput ref={ref} data-component-name="Input" id={name} {...props} />;
});

Input.defaultProps = {
  bigger: false,
  borderless: false,
  endSpacing: false,
  startSpacing: false,
  type: 'text',
  width: '100%',
};
Input.displayName = 'Input';
