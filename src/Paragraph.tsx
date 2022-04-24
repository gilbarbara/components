import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme, px } from './modules/helpers';
import {
  alignStyles,
  baseStyles,
  colorStyles,
  marginStyles,
  styledOptions,
} from './modules/system';
import { Text } from './Text';
import {
  ComponentProps,
  StyledProps,
  WithAlign,
  WithColor,
  WithMargin,
  WithTextOptions,
} from './types';

export interface ParagraphKnownProps
  extends StyledProps,
    WithAlign,
    WithColor,
    WithMargin,
    WithTextOptions {
  children: React.ReactNode;
}

export type ParagraphProps = ComponentProps<HTMLParagraphElement, ParagraphKnownProps>;

export const StyledParagraph = styled(
  'p',
  styledOptions,
)<ParagraphProps>(props => {
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${alignStyles(props)};
    ${colorStyles(props)};
    margin-bottom: 0;
    margin-top: 0;
    ${marginStyles(props)};

    & + & {
      margin-top: ${px(spacing.sm)};
    }
  `;
});

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledParagraph ref={ref} data-component-name="Paragraph" {...props}>
      {React.isValidElement(children) ? children : <Text {...rest}>{children}</Text>}
    </StyledParagraph>
  );
});

Paragraph.displayName = 'Paragraph';
