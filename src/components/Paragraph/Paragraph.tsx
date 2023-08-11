import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  alignStyles,
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
} from '~/modules/system';

import { Text } from '~/components/Text';

import {
  ComponentProps,
  StyledProps,
  WithAlign,
  WithChildren,
  WithColor,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface ParagraphKnownProps
  extends StyledProps,
    WithAlign,
    WithChildren,
    WithColor,
    WithMargin,
    WithTextOptions {}

export type ParagraphProps = ComponentProps<HTMLParagraphElement, ParagraphKnownProps>;

export const defaultProps = textDefaultOptions;

export const StyledParagraph = styled(
  'p',
  getStyledOptions(),
)<ParagraphProps>(props => {
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    margin-bottom: 0;
    margin-top: 0;
    ${alignStyles(props)};
    ${colorStyles(props)};
    ${marginStyles(props)};

    & + & {
      margin-top: ${px(spacing.sm)};
    }
  `;
});

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  const { children, ...rest } = { ...defaultProps, ...props };

  return (
    <StyledParagraph ref={ref} data-component-name="Paragraph" {...props}>
      {isValidElement(children) ? children : <Text {...rest}>{children}</Text>}
    </StyledParagraph>
  );
});

Paragraph.displayName = 'Paragraph';
