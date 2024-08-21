import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren } from '~/types';

export interface TruncateKnownProps extends StyledProps, WithChildren {
  /** @default 2 */
  lines?: number;
  maxWidth?: StringOrNumber;
}

export type TruncateProps = Simplify<TruncateKnownProps>;

export const defaultProps = {
  lines: 2,
} satisfies Omit<TruncateProps, 'children'>;

export function useTruncate(props: TruncateProps) {
  return useComponentProps(props, defaultProps);
}
