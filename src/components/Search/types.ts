import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { Icons, StyledProps, WithAccent, WithBorderless, WithChildren, WithMargin } from '~/types';

export interface SearchItem extends WithAccent {
  label?: ReactNode;
  value: string;
}

export type SearchOnSelect = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;

export interface SearchItemsProps
  extends Required<WithAccent>,
    Pick<SearchProps, 'noResultsLabel'> {
  active: boolean;
  cursor: number;
  height: StringOrNumber;
  isBusy: boolean;
  items: SearchItem[];
  onSelect: SearchOnSelect;
}

export interface SearchItemProps extends Required<WithAccent>, WithChildren {
  isSelected: boolean;
  onSelect: SearchOnSelect;
  value: string;
}

export interface SearchKnownProps extends StyledProps, WithAccent, WithBorderless, WithMargin {
  /**
   * Disable closing the list when you click outside.
   * @default false
   */
  disableCloseOnBlur?: boolean;
  /** @default false */
  disableKeyboardNavigation?: boolean;
  disabled?: boolean;
  height?: StringOrNumber;
  /** @default false */
  hideIcon?: boolean;
  /** @default search */
  icon?: Icons;
  items: SearchItem[];
  loading?: boolean;
  noResultsLabel?: ReactNode;
  onBlur?: (value: string) => void;
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
   * Disable internal filtering.
   * @default false
   */
  remote?: boolean;
  /**
   * Show the list on focus (if available)
   *
   * @default true
   */
  showListOnFocus?: boolean;
  style?: CSSProperties;
  /** @default 100% */
  width?: StringOrNumber;
}

export type SearchProps = Simplify<SearchKnownProps>;
