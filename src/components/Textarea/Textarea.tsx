import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, getStyledOptions, inputStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { TextareaProps, useTextarea } from './useTextarea';

export const StyledTextarea = styled(
  'textarea',
  getStyledOptions(),
)<TextareaProps & WithTheme>(props => {
  return css`
    ${baseStyles(props.theme)};
    ${inputStyles(props, 'textarea')};
  `;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    componentProps: { name, ...rest },
    getDataAttributes,
  } = useTextarea(props);

  return (
    <StyledTextarea ref={ref} {...getDataAttributes('Textarea')} id={name} name={name} {...rest} />
  );
});

Textarea.displayName = 'Textarea';

export { defaultProps, type TextareaProps } from './useTextarea';
