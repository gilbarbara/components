import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithHTMLAttributes, WithLabel } from '~/types';

export interface EmojiKnownProps
  extends StyledProps,
    WithHTMLAttributes<HTMLSpanElement>,
    WithLabel {
  size?: number;
  symbol: string;
}

export type EmojiProps = Simplify<EmojiKnownProps>;

export function useEmoji(props: EmojiProps) {
  return useComponentProps(props);
}
