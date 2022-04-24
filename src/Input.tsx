import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme, px } from './modules/helpers';
import { baseStyles, inputStyles, styledOptions } from './modules/system';
import { ComponentProps, InputTypes, StyledProps } from './types';

export interface InputKnownProps extends StyledProps {
  /** @default false */
  bigger?: boolean;
  /** @default false */
  borderless?: boolean;
  name: string;
  /** @default text */
  type?: InputTypes;
  /** @default 100% */
  width?: StringOrNumber;
}

export type InputProps = ComponentProps<HTMLInputElement, InputKnownProps>;

export const StyledInput = styled(
  'input',
  styledOptions,
)<InputProps>(props => {
  const { bigger, borderless, width } = props;
  const { inputHeight, spacing } = getTheme(props);

  const paddingX = bigger ? '16px' : '12px';

  return css`
    ${baseStyles(props)};
    ${inputStyles(props)};
    padding: ${paddingX} ${spacing.xxl} ${paddingX} ${borderless ? 0 : spacing.md};
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
  type: 'text',
  width: '100%',
};
Input.displayName = 'Input';
