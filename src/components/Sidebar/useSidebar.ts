import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  defaultProps as portalDefaultProps,
  PortalProps,
  splitPortalProps,
} from '~/components/Portal/usePortal';

import {
  DataAttributes,
  StyledProps,
  WithBorder,
  WithColors,
  WithDimension,
  WithDisplay,
  WithFlexBox,
  WithHTMLAttributes,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export type SidebarProps = Simplify<SidebarKnownProps>;

export interface SidebarKnownProps
  extends StyledProps,
    DataAttributes,
    WithBorder,
    WithColors,
    WithDimension,
    WithDisplay,
    WithFlexBox,
    WithHTMLAttributes,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow,
    PortalProps {
  /**
   * Add a blur effect to the sidebar.
   * It doesn't work with the default opacity.
   * @default true
   */
  blurred?: boolean;
  /**
   * The radius of the blur effect.
   * @default 4
   */
  blurredRadius?: number;
  /**
   * Disable the sidebar animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Show the sidebar.
   * @default false
   */
  isOpen: boolean;
  /**
   * The opacity of the sidebar (between 0 and 1).
   * @default 1
   */
  opacity?: number;
  /**
   * The origin transform of the sidebar.
   */
  origin?: 'top' | 'bottom';
  /**
   * The side and horizontal origin of the sidebar.
   * @default 'left'
   */
  side?: 'left' | 'right';
}

export const defaultProps = {
  ...portalDefaultProps,
  blurred: false,
  blurredRadius: 4,
  disableAnimation: false,
  isOpen: false,
  opacity: 1,
  p: 'md',
  side: 'left',
  width: 290,
} satisfies Omit<SidebarProps, 'children' | 'onDismiss'>;

export function useSidebar(props: SidebarProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props, defaultProps);
  const [sidebarProps, portalProps] = splitPortalProps(componentProps);

  return { getDataAttributes, portalProps, sidebarProps };
}
