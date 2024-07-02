import { forwardRef } from 'react';
import innerText from 'react-innertext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions } from '~/modules/system';

import { StyledProps, WithHTMLAttributes, WithLabel } from '~/types';

export interface EmojiKnownProps
  extends StyledProps,
    WithHTMLAttributes<HTMLSpanElement>,
    WithLabel {
  size?: number;
  symbol: string;
}

export type EmojiProps = Simplify<EmojiKnownProps>;

export const StyledEmoji = styled(
  'span',
  getStyledOptions(),
)<{ size?: number }>(props => {
  const { size } = props;

  return css`
    ${baseStyles(props)};
    display: inline-flex;
    line-height: 1;

    ${size &&
    css`
      font-size: ${px(size)};
      height: ${px(size)};
      width: ${px(size)};
    `};
  `;
});

export const Emoji = forwardRef<HTMLSpanElement, EmojiProps>((props, ref) => {
  const { label, size, symbol } = props;

  return (
    <StyledEmoji
      ref={ref}
      aria-hidden={label ? 'false' : 'true'}
      aria-label={label ? innerText(label) : ''}
      data-component-name="Emoji"
      size={size}
    >
      {symbol}
    </StyledEmoji>
  );
});

Emoji.displayName = 'Emoji';
