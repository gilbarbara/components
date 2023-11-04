import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Simplify, StringOrNull, StringOrNumber } from '@gilbarbara/types';

import { LoaderType } from '~/components/Loader/types';

import {
  OmitElementProps,
  SortDirection,
  StyledProps,
  VariantWithTones,
  WithAccent,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface DataTableColumn<T = string> {
  /**
   * Disable sorting for the column.
   * @default false
   */
  disableSort?: boolean;
  /**
   * Hide the column on smaller screens.
   * @default false
   */
  hideOnResponsive?: boolean;
  /**
   * Set the column as an action column and disable sorting.
   * @default false
   */
  isAction?: boolean;
  /**
   * The key to use for the column.
   */
  key: T;
  /**
   * The maximum width for the column.
   */
  max?: StringOrNumber;
  /**
   * The minimum width for the column.
   */
  min?: StringOrNumber;
  /**
   * The fixed width for the column.
   * Overrides `min` and `max`.
   */
  size?: StringOrNumber;
  /**
   * The title for the column.
   */
  title: ReactNode;
}

export type DataTableRowContent = ReactNode | { label: ReactNode; value: string };

export type DataTableRow<T extends string> = Simplify<
  Record<T, DataTableRowContent> & { id?: StringOrNumber }
>;

export interface DataTableKnownProps<T extends string>
  extends StyledProps,
    WithAccent,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius {
  /**
   * Component background color
   * If not set, the component will use 'gray.800' for darkMode otherwise 'gray.50'
   */
  bg?: VariantWithTones;
  /**
   * The breakpoint to switch to responsive mode.
   * @default 768 */
  breakpoint?: number;
  /**
   * Remove background and padding
   * @default false
   */
  clean?: boolean;
  /**
   * The columns to display
   */
  columns: Array<DataTableColumn<T>>;
  /**
   * The data to display
   */
  data: Array<DataTableRow<T>>;
  /**
   * The default column to sort by
   */
  defaultSortColumn?: T;
  /**
   * The default sort direction
   * @default asc
   */
  defaultSortDirection?: SortDirection;
  /**
   * Disable scroll to top on page change
   * @default false
   */
  disableScroll?: boolean;
  /**
   * The size of the loader.
   * @default 128
   */
  loaderSize?: number;
  /**
   * The type of loader to display.
   */
  loaderType?: LoaderType;
  /**
   * Show a loader while data is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * The maximum number of rows to display per page.
   * @default 10 */
  maxRows?: number;
  /**
   * Custom message when no results are found.
   * @default Nothing found
   */
  noResults?: ReactNode;
  onClickPage?: (page: number, totalPages: number) => void;
  onClickSort?: (sortedBy: T, sortDirection: SortDirection) => void;
  /**
   * Show pagination
   * @default true
   */
  pagination?: boolean;
  /**
   * Use remote paginated data.
   */
  remote?: {
    currentPage: number;
    totalPages: number;
    useInternalSorting?: boolean;
  };
  /**
   * Rearrange columns on smaller screens.
   * @default false
   */
  responsive?: boolean;
  /**
   * The duration of the scroll animation on page change.
   * @default 400
   */
  scrollDuration?: number;
  /**
   * The element to scroll to on page change.
   */
  scrollElement?: HTMLElement | null;
  /**
   * The margin to apply when scrolling to the element.
   */
  scrollMargin?: number;
  /**
   * Set the header sticky.
   * @default false
   */
  stickyHeader?: boolean;
  style?: CSSProperties;
  /**
   * The width of the table.
   * @default window.innerWidth */
  width?: number;
}

export type DataTableProps<T extends string = string> = Simplify<
  OmitElementProps<HTMLDivElement, DataTableKnownProps<T>, 'data' | 'wrap'>
>;

export interface DataTableHeadProps extends WithAccent, Pick<DataTableProps, 'clean' | 'columns'> {
  darkMode: boolean;
  isDisabled: boolean;
  isResponsive: boolean;
  onClick: MouseEventHandler;
  sortBy: StringOrNull;
  sortDirection: SortDirection;
  stickyHeader: boolean;
}

export interface DataTableBodyProps
  extends WithAccent,
    Pick<DataTableProps, 'clean' | 'columns' | 'data' | 'loaderSize' | 'loaderType' | 'loading'> {
  darkMode: boolean;
  isResponsive: boolean;
  sortColumn?: string;
}
