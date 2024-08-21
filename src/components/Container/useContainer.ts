import { CSSProperties } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Alignment,
  StyledProps,
  WithChildren,
  WithFlexBox,
  WithFlexItem,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
} from '~/types';

export interface ContainerKnownProps
  extends StyledProps,
    WithChildren,
    WithFlexBox,
    WithFlexItem,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithPadding {
  fullScreen?: boolean;
  fullScreenOffset?: StringOrNumber;
  /**
   * Update the padding for large screens.
   * @default true
   */
  responsive?: boolean;
  style?: CSSProperties;
  /** @default left */
  textAlign?: Alignment;
  verticalPadding?: boolean;
}

export type ContainerProps = Simplify<ContainerKnownProps>;

export const defaultProps = {
  align: 'stretch',
  direction: 'column',
  fullScreen: false,
  responsive: true,
  textAlign: 'left',
  justify: 'start',
  verticalPadding: false,
} satisfies Omit<ContainerProps, 'children'>;

export function useContainer(props: ContainerProps) {
  return useComponentProps(props, defaultProps);
}
