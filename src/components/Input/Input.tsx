import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, getStyledOptions, inputStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { InputProps, useInput } from './useInput';

export const StyledInput = styled(
  'input',
  getStyledOptions(),
)<InputProps & WithTheme>(props => {
  return css`
    ${baseStyles(props.theme)};
    ${inputStyles(props, 'input')};
  `;
});

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useInput(props);

  return (
    <StyledInput
      ref={ref}
      {...getDataAttributes('Input')}
      id={componentProps.name}
      {...componentProps}
    />
  );
});

Input.displayName = 'Input';

export { defaultProps, type InputProps } from './useInput';
