import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, colorStyles, getStyledOptions, textStyles } from './modules/system';
import { ComponentProps, StyledProps, WithColor, WithTextOptions } from './types';

export interface TextKnownProps extends StyledProps, WithColor, WithTextOptions {
  children: ReactNode;
}

export type TextProps = ComponentProps<HTMLSpanElement, TextKnownProps>;

export const StyledText = styled(
  'span',
  getStyledOptions(),
)<TextProps>(props => {
  return css`
    ${baseStyles(props)};
    ${colorStyles(props)};
    ${textStyles(props)};
    display: inline-block;
    text-decoration: inherit;
  `;
});

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => (
  <StyledText ref={ref} data-component-name="Text" {...props} />
));

Text.defaultProps = {
  bold: false,
  size: 'regular',
};
Text.displayName = 'Text';
