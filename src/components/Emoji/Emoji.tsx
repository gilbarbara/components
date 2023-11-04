import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions } from '~/modules/system';

import { OmitElementProps, StyledProps } from '~/types';

export interface EmojiKnownProps extends StyledProps {
  label?: string;
  size?: number;
  symbol: string;
}

export type EmojiProps = Simplify<OmitElementProps<HTMLSpanElement, EmojiKnownProps>>;

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
      aria-label={label ?? ''}
      data-component-name="Emoji"
      size={size}
    >
      {symbol}
    </StyledEmoji>
  );
});

Emoji.displayName = 'Emoji';
