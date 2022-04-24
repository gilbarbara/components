import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { baseStyles, inputStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps } from './types';

export interface TextareaProps extends ComponentProps<HTMLTextAreaElement, StyledProps> {
  borderless?: boolean;
}

export const StyledTextarea = styled(
  'textarea',
  styledOptions,
)<TextareaProps>(props => {
  const { borderless } = props;
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${inputStyles(props)};
    margin: 0;
    padding: ${spacing.md} ${spacing.xxl} ${spacing.md} ${borderless ? 0 : spacing.md};
    width: 100%;
  `;
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { name } = props;

  return <StyledTextarea ref={ref} data-component-name="Textarea" id={name} {...props} />;
});

Textarea.defaultProps = {
  rows: 3,
};
Textarea.displayName = 'Textarea';
