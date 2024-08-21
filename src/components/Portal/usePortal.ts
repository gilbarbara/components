import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren } from '~/types';

export interface PortalKnownProps extends StyledProps, WithChildren {
  /**
   * Close the portal when the overlay is clicked.
   * @default false
   */
  disableCloseOnClickOverlay?: boolean;
  /**
   * Close the portal when the escape key is pressed.
   * @default false
   */
  disableCloseOnEsc?: boolean;
  /**
   * Hide the overlay.
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * Whether the portal is visible.
   * @default false
   */
  isOpen?: boolean;
  /**
   * Callback when the portal is closed.
   */
  onClose?: () => void;
  /**
   * Callback when the portal is opened.
   */
  onOpen?: () => void;
  /**
   * Show a close button in the top right corner.
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * The z-index of the portal.
   * @default 1000
   */
  zIndex?: number;
}

export type PortalProps = Simplify<PortalKnownProps>;

export const defaultProps = {
  disableCloseOnClickOverlay: false,
  disableCloseOnEsc: false,
  hideOverlay: false,
  isOpen: false,
  showCloseButton: false,
  zIndex: 1000,
} satisfies Omit<PortalProps, 'children'>;

export function usePortal(props: PortalProps) {
  return useComponentProps(props, defaultProps);
}
