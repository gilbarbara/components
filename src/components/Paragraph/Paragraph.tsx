import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

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
  OmitElementProps,
  StyledProps,
  WithAlign,
  WithChildren,
  WithColors,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface ParagraphKnownProps
  extends StyledProps,
    WithAlign,
    WithChildren,
    Pick<WithColors, 'color'>,
    WithMargin,
    WithTextOptions {
  /**
   * Skip the top margin for adjacent paragraphs.
   * @default false
   */
  skipMarginTop?: boolean;
}

export type ParagraphProps = Simplify<OmitElementProps<HTMLParagraphElement, ParagraphKnownProps>>;

export const defaultProps = {
  skipMarginTop: false,
  ...textDefaultOptions,
};

export const StyledParagraph = styled(
  'p',
  getStyledOptions(),
)<ParagraphProps>(props => {
  const { skipMarginTop } = props;
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    margin-bottom: 0;
    margin-top: 0;
    ${alignStyles(props)};
    ${colorStyles(props)};
    ${marginStyles(props)};

    ${!skipMarginTop &&
    css`
      & + & {
        margin-top: ${px(spacing.sm)};
      }
    `};
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
