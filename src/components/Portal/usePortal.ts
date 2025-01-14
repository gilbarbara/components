import { PlainObject, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, Target, WithChildren, WithColors, WithPositioning } from '~/types';

export type PortalOwnPropsKeys = keyof typeof portalPropsKeys;

export type PortalProps = Simplify<PortalKnownProps>;

export interface PortalKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColors, 'bg'>,
    Omit<WithPositioning, 'zIndex'>,
    PortalOwnProps {}

export interface PortalOwnProps {
  /**
   * The easing of the animation.
   * @default ease-in-out
   */
  animationEasing?: string;
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
   * The container where the portal will be rendered.
   * @default document.body
   */
  container?: Target;
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
  isOpen: boolean;
  /**
   * Handler called after the portal is closed.
   */
  onClose?: () => void;
  /**
   * Handler called when the user tries to close it
   * by clicking the overlay or pressing the escape key.
   */
  onDismiss: () => void;
  /**
   * Handler called after the portal is opened.
   */
  onOpen?: () => void;
  /**
   * Add a blur effect to the overlay.
   * @default false
   */
  overlayBlur?: boolean;
  /**
   * The amount of blur to apply to the overlay.
   * @default 8
   */
  overlayBlurAmount?: number;
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
   * @default 100
   */
  zIndex?: number;
}

export const defaultProps = {
  animationEasing: 'ease-in-out',
  animationEnterDuration: 0.5,
  animationExitDuration: 0.5,
  container: document.body,
  disableAnimation: false,
  disableCloseOnClickOverlay: false,
  disableCloseOnEsc: false,
  hideOverlay: false,
  isOpen: false,
  overlayBlur: false,
  overlayBlurAmount: 8,
  overlayOpacity: 0.3,
  showCloseButton: false,
  zIndex: 100,
} satisfies Omit<PortalProps, 'children' | 'onDismiss'>;

export const portalPropsKeys: Record<Exclude<keyof PortalOwnProps, 'children'>, undefined> = {
  animationEasing: undefined,
  animationEnterDuration: undefined,
  animationExitDuration: undefined,
  container: undefined,
  disableAnimation: undefined,
  disableCloseOnClickOverlay: undefined,
  disableCloseOnEsc: undefined,
  hideOverlay: undefined,
  isOpen: undefined,
  onClose: undefined,
  onDismiss: undefined,
  onOpen: undefined,
  overlayBlur: undefined,
  overlayBlurAmount: undefined,
  overlayOpacity: undefined,
  showCloseButton: undefined,
  zIndex: undefined,
} as const;

export function createPortalElement() {
  const newElement = document.createElement('div');

  newElement.classList.add('__portal');

  return newElement;
}

export function getPortalElement() {
  return document.querySelector('.__portal');
}

export function splitPortalProps<T extends PlainObject<any>>(
  props: T,
): [
  otherProps: Omit<T, PortalOwnPropsKeys & keyof T>,
  portalProps: Pick<T, PortalOwnPropsKeys & keyof T>,
] {
  const otherProps: Partial<Omit<T, PortalOwnPropsKeys & keyof T>> = {};
  const portalProps: Partial<Pick<T, PortalOwnPropsKeys & keyof T>> = {};

  (Object.keys(props) as Array<keyof T>).forEach(key => {
    if (key in portalPropsKeys) {
      (portalProps as any)[key] = props[key];
    } else {
      (otherProps as any)[key] = props[key];
    }
  });

  return [
    otherProps as Omit<T, PortalOwnPropsKeys & keyof T>,
    portalProps as Pick<T, PortalOwnPropsKeys & keyof T>,
  ];
}

export function usePortal(props: PortalProps) {
  return useComponentProps(props, defaultProps);
}
