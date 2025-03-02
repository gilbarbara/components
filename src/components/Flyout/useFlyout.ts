import { CSSProperties, RefObject } from 'react';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  AnimationDirection,
  FloatingPlacement,
  StyledProps,
  WithAnimationType,
  WithChildren,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
} from '~/types';

export interface FlyoutProps
  extends StyledProps,
    WithAnimationType,
    WithChildren,
    WithLayout,
    WithMargin,
    WithPadding,
    Pick<WithPositioning, 'position'> {
  /**
   * The animation direction of the transition.
   * It's determined based on the `placement` unless explicitly provided.
   */
  direction?: AnimationDirection;
  /**
   * The distance between the trigger and the content.
   * @default 4
   */
  distance?: number;
  /**
   * The initial size of the content.
   *
   * Only used when `animationType` is set to `grow`.
   */
  initialSize?: number;
  /**
   * Callback fired when the content is fully hidden.
   */
  onHide?: () => void;
  /**
   * Callback fired when the content starts appearing.
   */
  onShow?: () => void;
  /**
   * Controls whether the content is visible.
   */
  open: boolean;
  /**
   * The preferred placement of the Flyout.
   *
   * If `triggerRef` is provided, the component may reposition itself when space is limited.
   * @default bottom
   */
  placement?: FloatingPlacement;
  style?: CSSProperties;
  /**
   * A reference to the element that triggers the Flyout.
   *
   * When provided, the Flyout attempts to reposition itself if there isn’t enough space for the preferred `placement`.
   */
  triggerRef?: RefObject<HTMLElement>;
}

export const defaultProps = {
  animationEnterDuration: 300,
  animationExitDuration: 300,
  animationType: 'slide',
  distance: 4,
  open: false,
  placement: 'bottom',
  position: 'absolute',
} satisfies Omit<FlyoutProps, 'children' | 'triggerRef'>;

export function useFlyout(props: FlyoutProps) {
  return useComponentProps(props, defaultProps);
}
