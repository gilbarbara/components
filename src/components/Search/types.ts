import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { StringOrNumber } from '@gilbarbara/types';

import { Icons, StyledProps, WithAccent, WithBorderless, WithChildren, WithMargin } from '~/types';

export interface SearchItem extends WithAccent {
  label?: ReactNode;
  value: string;
}

export interface SearchItemsProps
  extends Required<WithAccent>,
    Pick<SearchProps, 'noResultsLabel'> {
  active: boolean;
  cursor: number;
  height: StringOrNumber;
  items: SearchItem[];
  onSelect: MouseEventHandler;
}

export interface SearchItemProps extends Required<WithAccent>, WithChildren {
  isSelected: boolean;
  onClick: MouseEventHandler;
  value: string;
}

export interface SearchProps extends StyledProps, WithAccent, WithBorderless, WithMargin {
  height?: StringOrNumber;
  /** @default false */
  hideIcon?: boolean;
  /** @default search */
  icon?: Icons;
  items: SearchItem[];
  loading?: boolean;
  noResultsLabel?: ReactNode;
  onFocus?: (value: string) => void;
  /**
   * Fires after the "debounce" delay
   */
  onSearch?: (value: string) => void;
  /**
   * Debounce onSearch event in milliseconds.
   * Set it to 0 for real-time events.
   * @default 250
   */
  onSearchDebounce?: number;
  onSelect: (value: string) => void;
  /**
   * Fires immediately when the user types
   */
  onType?: (value: string) => void;
  /** @default Search for... */
  placeholder?: string;
  /**
   * Show the options on focus (if available)
   *
   * @default true
   */
  showListOnFocus?: boolean;
  style?: CSSProperties;
  /** @default 100% */
  width?: StringOrNumber;
}
