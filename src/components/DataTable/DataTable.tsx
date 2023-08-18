import { CSSProperties, MouseEvent, ReactNode, useMemo, useRef } from 'react';
import innerText from 'react-innertext';
import { useSetState, useUpdateEffect } from 'react-use';
import { useTheme } from '@emotion/react';
import { PlainObject, StringOrNumber } from '@gilbarbara/types';

import { scrollTo } from '~/modules/animations';
import { getElementProperty } from '~/modules/helpers';

import { Box, BoxCenter } from '~/components/Box';
import { Pagination } from '~/components/Pagination';
import { Text } from '~/components/Text';

import {
  ComponentProps,
  SortDirection,
  StyledProps,
  WithFlexItem,
  WithLayout,
  WithMargin,
} from '~/types';

import Body from './Body';
import Head from './Head';

export interface DataTableColumn<T = string> {
  disableSort?: boolean;
  hideOnResponsive?: boolean;
  isAction?: boolean;
  key: T;
  max?: StringOrNumber;
  min?: StringOrNumber;
  size?: StringOrNumber;
  title: ReactNode;
}

export interface DataTableKnownProps<T extends string>
  extends StyledProps,
    WithFlexItem,
    WithLayout,
    WithMargin {
  /** @default 768 */
  breakpoint?: number;
  /**
   * No background and padding
   * @default false
   */
  clean?: boolean;
  columns: DataTableColumn<T>[];
  data: PlainObject<any>[];
  /**
   * @deprecated Use `defaultSortColumn` instead
   */
  defaultColumn?: string;
  defaultSortColumn?: T;
  defaultSortDirection?: SortDirection;
  disableScroll?: boolean;
  /** @default false */
  loading?: boolean;
  /** @default 10 */
  maxRows?: number;
  noResults?: ReactNode;
  onClickPage?: (page: number, totalPages: number) => void;
  onClickSort?: (sortBy: string, sortDirection: string) => void;
  pagination?: boolean;
  paginationCurrentPage?: number;
  paginationServer?: boolean;
  paginationTotalPages?: number;
  /** @default false */
  responsive?: boolean;
  /** @default 400 */
  scrollDuration?: number;
  scrollElement?: HTMLElement | null;
  scrollMargin?: number;
  style?: CSSProperties;
  /** @default window.innerWidth */
  width?: number;
}

export type DataTableProps<T extends string = string> = ComponentProps<
  HTMLDivElement,
  DataTableKnownProps<T>,
  'data' | 'wrap'
>;

function sortData(data: any[], sortBy: string, sortDirection: string) {
  return [...data].sort((a, b) => {
    let left = innerText(a[sortBy]);
    let right = innerText(b[sortBy]);

    if (sortBy === 'date') {
      left = getElementProperty(a[sortBy], { type: 'time', property: 'dateTime' }) ?? left;
      right = getElementProperty(b[sortBy], { type: 'time', property: 'dateTime' }) ?? right;
    }

    if (sortDirection === 'desc') {
      return right.toLowerCase().localeCompare(left.toLowerCase());
    }

    return left.toLowerCase().localeCompare(right.toLowerCase());
  });
}

export const defaultProps = {
  breakpoint: 768,
  clean: false,
  loading: false,
  maxRows: 10,
  pagination: true,
  responsive: false,
  scrollDuration: 400,
  scrollMargin: 16,
} satisfies Omit<DataTableProps, 'columns' | 'data'>;

export function DataTable<T extends string = string>(props: DataTableProps<T>) {
  const {
    breakpoint,
    clean,
    columns,
    data,
    defaultColumn,
    defaultSortColumn,
    defaultSortDirection = 'asc',
    disableScroll,
    loading,
    maxRows,
    noResults,
    onClickPage,
    onClickSort,
    pagination,
    paginationCurrentPage,
    paginationServer,
    paginationTotalPages,
    responsive,
    scrollDuration,
    scrollElement,
    scrollMargin,
    width,
    ...rest
  } = { ...defaultProps, ...props };
  const { darkMode = false } = useTheme();
  const element = useRef<HTMLDivElement>(null);

  const [{ currentPage, sortBy, sortDirection }, setState] = useSetState({
    currentPage: 1,
    sortBy: defaultSortColumn ?? defaultColumn ?? columns?.[0].key,
    sortDirection: defaultSortDirection,
  });

  useUpdateEffect(() => {
    const minLength = currentPage * maxRows - maxRows;

    if (data.length < minLength) {
      setState({ currentPage: 1 });
    }
  }, [currentPage, data.length, maxRows, setState]);

  const isResponsive = responsive && (width ?? window.innerWidth) < breakpoint;
  const totalPages = Math.ceil(data.length / maxRows);

  const handleClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    const { page } = event.currentTarget.dataset;
    const pageNumber = Number(page);
    const scrollTarget = scrollElement ?? element.current;

    if (onClickPage) {
      onClickPage(pageNumber, paginationTotalPages ?? totalPages);
    }

    if (scrollTarget && !disableScroll) {
      scrollTo(scrollTarget.getBoundingClientRect().top - scrollMargin, { scrollDuration });
    }

    if (paginationServer) {
      return;
    }

    setState({ currentPage: pageNumber });
  };

  const handleClickSort = (event: MouseEvent<HTMLButtonElement>) => {
    const { direction, name = '' } = event.currentTarget.dataset;
    const reverseDirection: SortDirection = direction === 'asc' ? 'desc' : 'asc';
    const nextDirection = sortBy === name ? reverseDirection : 'asc';

    const options = {
      sortBy: name,
      sortDirection: nextDirection,
    };

    if (onClickSort) {
      onClickSort(name, nextDirection);
    }

    if (paginationServer) {
      setState(options);

      return;
    }

    setState(options);
  };

  const isEmpty = !loading && !data.length;
  const rows = useMemo(() => {
    return paginationServer ? data : sortData(data, sortBy, sortDirection);
  }, [data, paginationServer, sortBy, sortDirection]);

  const body = useMemo(() => {
    if (isEmpty) {
      return (
        <BoxCenter bg="white" padding="md" radius="sm" width="100%">
          {noResults ?? <Text bold>Nothing found</Text>}
        </BoxCenter>
      );
    }

    return (
      <Body
        clean={clean}
        columns={columns}
        data={rows.slice(maxRows * (currentPage - 1), maxRows * currentPage)}
        isResponsive={isResponsive}
        loading={loading}
        sortColumn={defaultSortColumn ?? defaultColumn}
      />
    );
  }, [
    clean,
    columns,
    currentPage,
    defaultColumn,
    defaultSortColumn,
    isEmpty,
    isResponsive,
    loading,
    maxRows,
    noResults,
    rows,
  ]);

  const styles: PlainObject = {};

  if (!clean) {
    styles.bg = darkMode ? 'gray.800' : 'gray.50';
    styles.padding = 'md';
  }

  return (
    <Box
      ref={element}
      data-component-name="DataTable"
      maxWidth="100%"
      radius="xxs"
      width={width}
      {...styles}
      {...rest}
    >
      <Head
        clean={clean}
        columns={columns}
        isDisabled={loading ?? isEmpty}
        isResponsive={isResponsive}
        onClick={handleClickSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      {body}
      {pagination && (
        <Box border={clean ? [{ side: 'top' }] : undefined} pt={clean ? 'sm' : undefined}>
          <Pagination
            currentPage={paginationCurrentPage ?? currentPage}
            onClick={handleClickPage}
            totalPages={paginationTotalPages ?? totalPages}
          />
        </Box>
      )}
    </Box>
  );
}

DataTable.displayName = 'DataTable';
