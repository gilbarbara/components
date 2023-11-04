import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions, inputStyles } from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from '~/types';

export interface TextareaKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithElementSpacing,
    WithFormElements {}

export type TextareaProps = Simplify<
  OmitElementProps<HTMLTextAreaElement, TextareaKnownProps, 'name'>
>;

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  prefixSpacing: false,
  readOnly: false,
  rows: 3,
  suffixSpacing: false,
  width: '100%',
} satisfies Omit<TextareaProps, 'name'>;

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
  const { name, ...rest } = { ...defaultProps, ...props };

  return (
    <StyledTextarea ref={ref} data-component-name="Textarea" id={name} name={name} {...rest} />
  );
});

Textarea.displayName = 'Textarea';
