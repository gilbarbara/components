import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import innerText from 'react-innertext';
import { Simplify, StringOrNull, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { useComponentProps } from '~/hooks/useComponentProps';
import { UseThemeReturn } from '~/hooks/useTheme';

import { LoaderType } from '~/components/Loader/useLoader';

import {
  BorderItem,
  SortDirection,
  StyledProps,
  Theme,
  VariantWithTones,
  WithAccent,
  WithFlexItem,
  WithHTMLAttributes,
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

export type DataTableRow<TKeys extends string> = Simplify<
  Record<TKeys, DataTableRowContent> & { id?: StringOrNumber }
>;

export interface DataTableKnownProps<TKeys extends string>
  extends StyledProps,
    WithAccent,
    WithFlexItem,
    WithHTMLAttributes,
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
  columns: Array<DataTableColumn<TKeys>>;
  /**
   * The data to display
   */
  data: Array<DataTableRow<TKeys>>;
  /**
   * The default column to sort by
   */
  defaultSortColumn?: TKeys;
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
  onClickSort?: (sortedBy: TKeys, sortDirection: SortDirection) => void;
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

export type DataTableProps<T extends string = string> = Simplify<DataTableKnownProps<T>>;

export interface DataTableHeadProps extends WithAccent, Pick<DataTableProps, 'clean' | 'columns'> {
  getDataAttributes: UseThemeReturn['getDataAttributes'];
  isDisabled: boolean;
  isResponsive: boolean;
  onClick: MouseEventHandler;
  sortBy: StringOrNull;
  sortDirection: SortDirection;
  stickyHeader: boolean;
  theme: Theme;
}

export interface DataTableBodyProps
  extends WithAccent,
    Pick<DataTableProps, 'clean' | 'columns' | 'data' | 'loaderSize' | 'loaderType' | 'loading'> {
  getDataAttributes: UseThemeReturn['getDataAttributes'];
  isResponsive: boolean;
  sortColumn?: string;
  theme: Theme;
}

export const defaultProps = {
  accent: 'primary',
  breakpoint: 768,
  clean: false,
  defaultSortDirection: 'asc',
  disableScroll: false,
  loaderSize: 128,
  loaderType: 'pill',
  loading: false,
  maxRows: 10,
  pagination: true,
  radius: 'xs',
  responsive: false,
  scrollDuration: 400,
  scrollMargin: 16,
  stickyHeader: false,
} satisfies Omit<DataTableProps, 'columns' | 'data'>;

export function getBorder(darkMode: boolean): Array<BorderItem> {
  return [{ side: 'top', color: darkMode ? 'gray.700' : 'gray.100' }];
}

export function getRowContent<T extends DataTableRow<string>>(input: T, key: string) {
  const item = input[key];

  return is.plainObject(item) && 'label' in item ? item.label : item;
}

export function getRowKey<T extends DataTableRow<string>>(input: T, index: number) {
  return is.string(input.id) || is.number(input.id) ? input.id : index;
}

export function sortData<T extends string>(
  data: Array<DataTableRow<T>>,
  sortBy: T,
  sortDirection: SortDirection,
) {
  if (!sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    const leftValue = a[sortBy];
    const rightValue = b[sortBy];

    const left =
      is.plainObject(leftValue) && 'value' in leftValue ? leftValue.value : innerText(leftValue);
    const right =
      is.plainObject(rightValue) && 'value' in rightValue
        ? rightValue.value
        : innerText(rightValue);

    if (sortDirection === 'desc') {
      return right.toLowerCase().localeCompare(left.toLowerCase(), undefined, { numeric: true });
    }

    return left.toLowerCase().localeCompare(right.toLowerCase(), undefined, { numeric: true });
  });
}

export function useDataTable<TKeys extends string>(props: DataTableProps<TKeys>) {
  return useComponentProps(props, defaultProps);
}
