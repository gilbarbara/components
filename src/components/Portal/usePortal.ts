import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren, WithColors, WithPositioning } from '~/types';

export interface PortalKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColors, 'bg'>,
    WithPositioning {
  /**
   * The duration of the animation when the content is fading in (in seconds)
   * @default 0.5
   */
  animationEnterDuration?: number;
  /**
   * The duration of the animation when the content is fading out (in seconds)
   * @default 0.5
   */
  animationExitDuration?: number;
  /**
   * Disable the animation when the portal is opening/closing.
   * @default false
   */
  disableAnimation?: boolean;
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
   * Add a blur effect to the overlay.
   * @default false
   */
  overlayBlur?: boolean;
  /**
   * The amount of blur to apply to the overlay.
   * @default 8px
   */
  overlayBlurAmount?: `${number}px`;
  /**
   * The opacity of the overlay (between 0 and 1).
   * @default 0.3
   */
  overlayOpacity?: number;
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
  animationEnterDuration: 0.5,
  animationExitDuration: 0.5,
  disableAnimation: false,
  disableCloseOnClickOverlay: false,
  disableCloseOnEsc: false,
  hideOverlay: false,
  isOpen: false,
  overlayBlur: false,
  overlayBlurAmount: '8px',
  overlayOpacity: 0.3,
  showCloseButton: false,
  zIndex: 1000,
} satisfies Omit<PortalProps, 'children'>;

export function getPortalElement() {
  return document.querySelector('.__portal');
}

export function createPortalElement() {
  const newElement = document.createElement('div');

  newElement.classList.add('__portal');

  return newElement;
}

export function usePortal(props: PortalProps) {
  return useComponentProps(props, defaultProps);
}
