import { AriaAttributes, ReactElement, ReactNode } from 'react';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Spacing,
  StyledProps,
  WithColors,
  WithDisabled,
  WithFlexBox,
  WithHTMLAttributes,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface CollapseKnownProps
  extends StyledProps,
    AriaAttributes,
    WithColors,
    WithDisabled,
    Omit<WithHTMLAttributes, 'id' | 'title'>,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  /**
   * The duration of the animation when the content is sliding down in seconds.
   * @default 0.3
   */
  animationEnterDuration?: number;
  /**
   * The duration of the animation when the content is sliding up in seconds.
   * @default 0.3
   */
  animationExitDuration?: number;
  /**
   * The component to display at the bottom if `showBottomToggle` is true.
   */
  bottomToggle?: (props: { isOpen: boolean; toggleProps: Record<string, any> }) => ReactElement;
  children: ReactNode;
  /**
   * The name of the component.
   * @default "Collapse"
   */
  componentName?: string;
  defaultOpen?: boolean;
  /**
   * The distance between the header and the toggle
   *
   * @default xs
   */
  gap?: Spacing;
  /**
   * Text alignment for the default header.
   */
  headerAlign?: WithFlexBox['align'];
  /**
   * The component to display at the header.
   */
  headerToggle?: ReactNode | ((props: { isDisabled: boolean; isOpen: boolean }) => ReactElement);
  hideHeaderToggle?: boolean;
  /**
   * The id of the component.
   */
  id?: string;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  initialHeight?: StringOrNumber;
  /**
   * The height you want the content in its expanded state.
   */
  maxHeight?: StringOrNumber;
  onToggle?: (isOpen: boolean, id?: string) => void;
  open?: boolean;
  /**
   * The role of the component.
   */
  role?: string;
  /**
   * Show a toggle at the bottom of the content to open/close it.
   * @default false
   */
  showBottomToggle?: boolean;
  /**
   * The accordion item start content, usually an icon or avatar.
   */
  startContent?: ReactNode;
  title?: ReactNode;
}

export type CollapseProps = Simplify<CollapseKnownProps>;

export interface ContentProps
  extends Pick<
    SetRequired<
      CollapseProps,
      'animationEnterDuration' | 'animationExitDuration' | 'initialHeight'
    >,
    'animationEnterDuration' | 'animationExitDuration' | 'initialHeight' | 'maxHeight'
  > {
  hasTitle: boolean;
  isOpen: boolean;
  scrollHeight: number;
  shouldAnimate: boolean;
}

export const defaultProps = {
  animationEnterDuration: 0.3,
  animationExitDuration: 0.3,
  'aria-label': 'Toggle the content',
  componentName: 'Collapse',
  defaultOpen: false,
  disabled: false,
  gap: 'xs',
  headerAlign: 'start',
  hideHeaderToggle: false,
  initialHeight: 0,
  showBottomToggle: false,
} satisfies Omit<CollapseProps, 'children'>;

export function useCollapse(props: CollapseProps) {
  return useComponentProps(props, defaultProps);
}
