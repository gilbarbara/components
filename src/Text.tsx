import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, colorStyles, getStyledOptions, textStyles } from './modules/system';
import { ComponentProps, StyledProps, WithChildren, WithColor, WithTextOptions } from './types';

export interface TextKnownProps extends StyledProps, WithChildren, WithColor, WithTextOptions {}

export type TextProps = ComponentProps<HTMLSpanElement, TextKnownProps>;

export const StyledText = styled(
  'span',
  getStyledOptions(),
)<TextProps>(props => {
  return css`
    ${baseStyles(props)};
    display: inline-block;
    text-decoration: inherit;
    ${colorStyles(props)};
    ${textStyles(props)};
  `;
});

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => (
  <StyledText ref={ref} data-component-name="Text" {...props} />
));

Text.defaultProps = {
  bold: false,
  size: 'regular',
};
