import { CSSProperties, ReactNode } from 'react';
import { RequireExactlyOne, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { Icons, StyledProps, WithColors, WithMargin } from '~/types';

export type IconProps = Simplify<RequireExactlyOne<IconKnownProps, 'name' | 'url'>>;

export interface IconKnownProps extends StyledProps, Pick<WithColors, 'color'>, WithMargin {
  name: Icons;
  /** @default 16 */
  size?: number;
  spin?: boolean;
  style?: CSSProperties;
  title?: ReactNode;
  url: string;
}

export const defaultProps = {
  size: 16,
  spin: false,
} satisfies Omit<IconProps, 'name' | 'url'>;

export function useIcon(props: IconProps) {
  return useComponentProps(props, defaultProps);
}
