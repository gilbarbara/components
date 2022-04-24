import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, colorStyles, styledOptions, textStyles } from './modules/system';
import { ComponentProps, StyledProps, WithColor, WithTextOptions } from './types';

export interface TextKnownProps extends StyledProps, WithColor, WithTextOptions {
  children: React.ReactNode;
}

export type TextProps = ComponentProps<HTMLSpanElement, TextKnownProps>;

export const StyledText = styled(
  'span',
  styledOptions,
)<TextProps>(props => {
  return css`
    ${baseStyles(props)};
    ${colorStyles(props)};
    ${textStyles(props)};
    display: inline-block;
    text-decoration: inherit;
  `;
});

export const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => (
  <StyledText ref={ref} data-component-name="Text" {...props} />
));

Text.defaultProps = {
  bold: false,
  size: 'regular',
};
Text.displayName = 'Text';
