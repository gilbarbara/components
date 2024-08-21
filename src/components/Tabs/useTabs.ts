import { CSSProperties, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { useComponentProps } from '~/hooks/useComponentProps';

import { Orientation, StyledProps, WithAccent, WithChildren, WithMargin } from '~/types';

export interface TabsKnownProps extends StyledProps, WithAccent, WithChildren, WithMargin {
  defaultId?: string;
  /** @default false */
  disableActiveBorderRadius?: boolean;
  id?: string;
  loader?: ReactNode;
  maxHeight?: number | StandardLonghandProperties['maxHeight'];
  minHeight?: number | StandardLonghandProperties['minHeight'];
  noContent?: ReactNode;
  onClick?: (id: string) => void;
  /**
   * The orientation of the tabs.
   * @default vertical
   */
  orientation?: Orientation;
  style?: CSSProperties;
}

export type TabsProps = Simplify<TabsKnownProps>;

export const defaultProps = {
  accent: 'primary',
  disableActiveBorderRadius: false,
  orientation: 'vertical',
} satisfies Omit<TabsProps, 'children'>;

export function useTabs(props: TabsProps) {
  return useComponentProps(props, defaultProps);
}
