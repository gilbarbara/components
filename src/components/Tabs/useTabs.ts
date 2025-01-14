import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  ColorVariantTones,
  Orientation,
  StyledProps,
  WithAccent,
  WithChildren,
  WithColors,
  WithDimension,
  WithDisabled,
  WithFlexBox,
  WithHTMLAttributes,
  WithMargin,
  WithPadding,
} from '~/types';

export type TabProps = Simplify<TabKnownProps>;

export type TabsProps = Simplify<TabsKnownProps>;

export interface TabKnownProps
  extends StyledProps,
    WithChildren,
    WithColors,
    WithDisabled,
    WithPadding {
  id: string;
  title: ReactNode;
}

export interface TabsKnownProps
  extends StyledProps,
    WithAccent,
    WithColors,
    WithChildren,
    WithDimension,
    Pick<WithFlexBox, 'gap'>,
    WithHTMLAttributes,
    WithMargin {
  /**
   * The id of the default active tab.
   * If not provided, the first tab is active by default.
   */
  defaultId?: string;
  /**
   * Hide the active tab indicator.
   * @default false
   */
  hideIndicator?: boolean;
  /**
   * A loader component to display while content is loading.
   */
  loader?: ReactNode;
  /**
   * Configuration options for the tabs menu, such as styles and behavior.
   */
  menu?: TabsMenuConfig;
  /**
   * Content to display when there are no active tabs or content to show.
   * Typically used as a fallback or empty state.
   */
  noContent?: ReactNode;
  /**
   * Hnadler called when a tab is clicked.
   */
  onClick?: (id: string) => void;
  /**
   * The orientation of the tabs.
   * @default horizontal
   */
  orientation?: Orientation;
}

export interface TabsMenuConfig extends Pick<WithFlexBox, 'gap'> {
  /**
   * The background color of the active tab.
   */
  activeItemBgColor?: ColorVariantTones;
  /**
   * The color of the active tab.
   */
  activeItemColor?: ColorVariantTones;
  /**
   * The border color of the menu.
   * Use `transparent` to hide it.
   */
  borderColor?: ColorVariantTones;
  /**
   * The thickness of the menu border, in pixels.
   * @default 2
   */
  borderSize?: number;
  /**
   * Expand menu items to occupy the full width of the container.
   * @default false
   */
  expand?: boolean;
  /**
   * The color of the active tab indicator.
   */
  indicatorColor?: ColorVariantTones;
  /**
   * The length of the active tab indicator.
   * Specifies the width (for horizontal menus) or height (for vertical menus).
   * Accepts a number (pixels) or a percentage string.
   */
  indicatorLength?: number | `${number}%`;
  /**
   * Custom styles for the active tab indicator.
   * Use this to set properties like `borderRadius`, `position`, etc.
   */
  indicatorStyle?: CSSProperties;
  /**
   * The background color of the menu items.
   */
  itemBgColor?: ColorVariantTones;
  /**
   * The text color of the menu items.
   */
  itemColor?: ColorVariantTones;
  /**
   * Custom styles for the menu items.
   * Use this to override properties like `borderRadius`, `padding`, etc.
   */
  itemStyle?: CSSProperties;
  /**
   * The width of the menu when in vertical orientation.
   */
  width?: string | number;
}

export interface TabsMenuProps extends Omit<TabsProps, 'width'> {
  activeId: string;
  onClickItem: MouseEventHandler<HTMLButtonElement>;
  tabs: TabProps[];
  uniqueId: string;
}

export const defaultProps = {
  accent: 'primary',
  gap: 'md',
  hideIndicator: false,
  menu: {},
  orientation: 'horizontal',
  width: '100%',
} satisfies Omit<TabsProps, 'children'>;

export function useTabs(props: TabsProps) {
  return useComponentProps(props, defaultProps);
}
