import { CSSProperties, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  WithAccent,
  WithBorder,
  WithChildrenOptional,
  WithDisabled,
  WithMargin,
  WithPadding,
} from '~/types';

export type PaginationProps = Simplify<PaginationKnownProps>;

export interface PaginationButtonProps extends WithAccent, WithChildrenOptional {
  currentPage: number;
  disabled: boolean;
  onClick?: (currentPage: number, type?: string) => void;
  page: number;
  type?: string;
}

export interface PaginationItem extends WithDisabled {
  content?: ReactNode;
  page?: number;
  type: string;
}

export interface PaginationKnownProps extends WithAccent, WithBorder, WithMargin, WithPadding {
  /** @default end */
  align?: 'start' | 'center' | 'end';
  currentPage: number;
  /**
   * Hide First/Last links
   * @default false
   */
  disableEdgeNavigation?: boolean;
  /**
   * Limit to show the First/Last buttons
   * @default 3
   */
  edgeNavigationLimit?: number;
  onClick: (currentPage: number, type?: string) => void;
  /**
   * Show even if there is only one page
   * @default false
   */
  showSinglePage?: boolean;
  style?: CSSProperties;
  totalPages: number;
}

export const defaultProps = {
  accent: 'primary',
  align: 'end',
  disableEdgeNavigation: false,
  edgeNavigationLimit: 3,
  showSinglePage: false,
} satisfies Omit<PaginationProps, 'currentPage' | 'onClick' | 'totalPages'>;

export function usePagination(props: PaginationProps) {
  return useComponentProps(props, defaultProps);
}

export function usePaginationButton(props: PaginationButtonProps) {
  return useComponentProps(props);
}
