import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme, px } from './modules/helpers';
import { baseStyles, getStyledOptions, inputStyles } from './modules/system';
import { ComponentProps, StyledProps, WithFormElements } from './types';

export interface TextareaKnownProps extends StyledProps, WithFormElements {}

export type TextareaProps = ComponentProps<HTMLTextAreaElement, TextareaKnownProps>;

export const StyledTextarea = styled(
  'textarea',
  getStyledOptions(),
)<TextareaProps>(props => {
  const { borderless, endSpacing, startSpacing, width } = props;
  const { spacing } = getTheme(props);

  const paddingX = spacing.xs;
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
    width: ${width ? px(width) : '100%'};
    ${inputStyles(props)};
  `;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { name } = props;

  return <StyledTextarea ref={ref} data-component-name="Textarea" id={name} {...props} />;
});

Textarea.defaultProps = {
  rows: 3,
};
Textarea.displayName = 'Textarea';
