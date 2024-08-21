import { CSSProperties, ReactNode } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Alignment,
  StyledProps,
  WithColors,
  WithFlexBox,
  WithHTMLAttributes,
  WithPadding,
} from '~/types';

export interface PageKnownProps
  extends StyledProps,
    WithColors,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithHTMLAttributes,
    WithPadding {
  /**
   * Override `align` and `justify` to "center"
   *
   * @default false
   */
  centered?: boolean;
  children: ReactNode;
  /** @default false */
  isLoading?: boolean;
  maxWidth?: StringOrNumber;
  /** @default 100vh */
  minHeight?: StringOrNumber;
  /**
   * Set the `data` attribute property
   * @default Page
   */
  name?: string;
  /**
   * Don't add the default padding
   * @default false
   */
  skipSpacing?: boolean;
  style?: CSSProperties;
  textAlign?: Alignment;
}

export type PageProps = Simplify<PageKnownProps>;

export const defaultProps = {
  centered: false,
  isLoading: false,
  minHeight: '100vh',
  name: 'Page',
  skipSpacing: false,
} satisfies Omit<PageProps, 'children'>;

export function usePage(props: PageProps) {
  return useComponentProps(props, defaultProps);
}
