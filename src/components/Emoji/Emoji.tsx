import { forwardRef } from 'react';
import innerText from 'react-innertext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { EmojiProps, useEmoji } from './useEmoji';

export const StyledEmoji = styled(
  'span',
  getStyledOptions(),
)<WithTheme & { size?: number }>(props => {
  const { size } = props;

  return css`
    display: inline-flex;
    line-height: 1;
    ${getStyles(omit(props, 'size'))};

    ${size &&
    css`
      font-size: ${px(size)};
      height: ${px(size)};
      width: ${px(size)};
    `};
  `;
});

export const Emoji = forwardRef<HTMLSpanElement, EmojiProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useEmoji(props);
  const { label, size, symbol, theme } = componentProps;

  return (
    <StyledEmoji
      ref={ref}
      aria-hidden={label ? 'false' : 'true'}
      aria-label={label ? innerText(label) : ''}
      {...getDataAttributes('Emoji')}
      size={size}
      theme={theme}
    >
      {symbol}
    </StyledEmoji>
  );
});

Emoji.displayName = 'Emoji';

export type { EmojiProps } from './useEmoji';
