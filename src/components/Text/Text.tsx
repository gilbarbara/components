import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { textDefaultOptions } from '~/modules/options';
import {
  baseStyles,
  colorStyles,
  flexItemStyles,
  getStyledOptions,
  textStyles,
} from '~/modules/system';

import {
  StyledProps,
  WithChildren,
  WithColors,
  WithFlexItem,
  WithHTMLAttributes,
  WithTextOptions,
} from '~/types';

export interface TextKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColors, 'color'>,
    WithFlexItem,
    WithHTMLAttributes,
    WithTextOptions {}

export type TextProps = Simplify<TextKnownProps>;

export const StyledText = styled(
  'span',
  getStyledOptions(),
)<TextProps>(props => {
  return css`
    ${baseStyles(props)};
    display: inline-block;
    text-decoration: inherit;
    ${colorStyles(props)};
    ${flexItemStyles(props)}
    ${textStyles(props)};
  `;
});

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const mergedProps = mergeProps(textDefaultOptions, props);
  const { getDataAttributes } = useTheme();

  return <StyledText ref={ref} {...getDataAttributes('Text')} {...mergedProps} />;
});

Text.displayName = 'Text';
