import { CSSProperties, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  AvatarSize,
  StyledProps,
  VariantWithTones,
  WithColorsDefaultBg,
  WithFlexItem,
  WithRadius,
} from '~/types';

export interface AvatarKnownProps
  extends StyledProps,
    WithColorsDefaultBg,
    WithFlexItem,
    WithRadius {
  /**
   * Avatar border
   */
  borderColor?: VariantWithTones;
  /**
   * Avatar border
   */
  bordered?: boolean;
  /**
   * Fallback content when no image is provided
   */
  fallback?: ReactNode;
  /**
   * Override the default font size.
   */
  fontSize?: string | number;
  /**
   * Image URL
   */
  image?: string;
  name?: string;
  /**
   * Avatar size.
   * @default md
   */
  size?: AvatarSize | number;
  style?: CSSProperties;
}

export type AvatarProps = Simplify<AvatarKnownProps>;

export const defaultProps = {
  bg: 'primary',
  borderColor: 'primary',
  bordered: false,
  size: 'md',
  radius: 'round',
} satisfies Omit<AvatarProps, 'name'>;

export function useAvatar(props: AvatarProps) {
  return useComponentProps(props, defaultProps);
}
