import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren } from '~/types';

export type TruncateProps = Simplify<TruncateKnownProps>;

export interface TruncateKnownProps extends StyledProps, WithChildren {
  /** @default 2 */
  lines?: number;
  maxWidth?: StringOrNumber;
}

export const defaultProps = {
  lines: 2,
} satisfies Omit<TruncateProps, 'children'>;

export function useTruncate(props: TruncateProps) {
  return useComponentProps(props, defaultProps);
}
