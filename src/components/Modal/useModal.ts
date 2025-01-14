import { CSSProperties, ReactNode } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { useComponentProps } from '~/hooks/useComponentProps';

import { defaultProps as portalDefaultProps, type PortalProps } from '~/components/Portal/Portal';
import { splitPortalProps } from '~/components/Portal/usePortal';

import { StyledProps, WithBorder, WithPadding, WithRadius, WithShadow } from '~/types';

export type ModalProps = Simplify<ModalKnownProps>;

export interface ModalKnownProps
  extends StyledProps,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'showCloseButton'> {
  /**
   * Hide the close button.
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * The maximum height of the modal.
   * @default '80vh'
   */
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  /**
   * The maximum width of the modal.
   * @default '100vw'
   */
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  style?: CSSProperties;
  title?: ReactNode;
  /**
   * The width of the modal.
   */
  width?: StringOrNumber;
}

export const defaultProps = {
  ...portalDefaultProps,
  hideCloseButton: false,
  maxHeight: '80vh',
  maxWidth: '100vw',
  padding: 'lg',
  radius: 'lg',
  shadow: 'high',
} satisfies Omit<ModalProps, 'children' | 'onDismiss'>;

export function useModal(props: ModalProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props, defaultProps);

  const [modalProps, portalProps] = splitPortalProps(componentProps);

  return { modalProps, portalProps, getDataAttributes };
}
