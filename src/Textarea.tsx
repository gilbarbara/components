import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, getStyledOptions, inputStyles } from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from './types';

export interface TextareaKnownProps
  extends StyledProps,
    WithBorderless,
    WithElementSpacing,
    WithFormElements {}

export type TextareaProps = ComponentProps<HTMLTextAreaElement, TextareaKnownProps, 'name'>;

export const StyledTextarea = styled(
  'textarea',
  getStyledOptions(),
)<TextareaProps>(props => {
  return css`
    ${baseStyles(props)};
    ${inputStyles(props, 'textarea')};
  `;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { name } = props;

  return <StyledTextarea ref={ref} data-component-name="Textarea" id={name} {...props} />;
});

Textarea.defaultProps = {
  borderless: false,
  disabled: false,
  prefixSpacing: false,
  readOnly: false,
  rows: 3,
  suffixSpacing: false,
  width: '100%',
};
