import { CSSProperties, MouseEvent, ReactNode, useMemo, useRef } from 'react';
import innerText from 'react-innertext';
import { useSetState, useUpdateEffect } from 'react-use';
import { useTheme } from '@emotion/react';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';

import Body from './Body';
import Head from './Head';

import { Box, BoxCenter } from '../Box';
import { scrollTo } from '../modules/animations';
import { getElementProperty } from '../modules/helpers';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import { ComponentProps, StyledProps, WithFlexItem, WithLayout, WithMargin } from '../types';

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

export interface DataTableKnownProps extends StyledProps, WithFlexItem, WithLayout, WithMargin {
  /** @default 768 */
  breakpoint?: number;
  /**
   * No background and padding
   * @default false
   */
  clean?: boolean;
  columns: DataTableColumn[];
  data: AnyObject[];
  defaultColumn?: string;
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
  width?: StringOrNumber;
}

export type DataTableProps = ComponentProps<HTMLDivElement, DataTableKnownProps, 'data' | 'wrap'>;

function sortData(data: any[], sortBy: string, sortDirection: string) {
  return [...data].sort((a, b) => {
    let left = innerText(a[sortBy]);
    let right = innerText(b[sortBy]);

    if (sortBy === 'date') {
      left = getElementProperty(a[sortBy], { type: 'time', property: 'dateTime' }) || left;
      right = getElementProperty(b[sortBy], { type: 'time', property: 'dateTime' }) || right;
    }

    if (sortDirection === 'desc') {
      return right.toLowerCase().localeCompare(left.toLowerCase());
    }

    return left.toLowerCase().localeCompare(right.toLowerCase());
  });
}

export function DataTable(props: DataTableProps): JSX.Element {
  const {
    breakpoint = 768,
    clean,
    columns,
    data,
    defaultColumn,
    disableScroll,
    loading = false,
    maxRows = 10,
    noResults,
    onClickPage,
    onClickSort,
    pagination = true,
    paginationCurrentPage,
    paginationServer,
    paginationTotalPages,
    responsive = false,
    scrollDuration = 400,
    scrollElement,
    scrollMargin = 16,
    width,
    ...rest
  } = props;
  const { darkMode = false } = useTheme();
  const element = useRef<HTMLDivElement>(null);

  const sortByDefault = defaultColumn || columns?.[0].key;

  const [{ currentPage, sortBy, sortDirection }, setState] = useSetState({
    currentPage: 1,
    sortBy: sortByDefault,
    sortDirection: 'asc',
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
    const scrollTarget = scrollElement || element.current;

    if (onClickPage) {
      onClickPage(pageNumber, paginationTotalPages || totalPages);
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
    const reverseDirection = direction === 'asc' ? 'desc' : 'asc';
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
        <BoxCenter padding="md" radius="sm" variant="white" width="100%">
          {noResults || <Text bold>Nothing found</Text>}
        </BoxCenter>
      );
    }

    return (
      <Body
        clean={clean}
        columns={columns}
        data={rows.slice(maxRows * (currentPage - 1), maxRows * currentPage)}
        defaultColumn={defaultColumn}
        isResponsive={isResponsive}
        loading={loading}
      />
    );
  }, [
    clean,
    columns,
    currentPage,
    defaultColumn,
    isEmpty,
    isResponsive,
    loading,
    maxRows,
    noResults,
    rows,
  ]);

  const styles: AnyObject = {};

  if (!clean) {
    styles.padding = 'md';
    styles.shade = darkMode ? 'darker' : 'lightest';
    styles.variant = 'gray';
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
        isDisabled={loading || isEmpty}
        isResponsive={isResponsive}
        onClick={handleClickSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      {body}
      {pagination && (
        <Box border={clean ? [{ side: 'top' }] : undefined} pt={clean ? 'sm' : undefined}>
          <Pagination
            currentPage={paginationCurrentPage || currentPage}
            onClick={handleClickPage}
            totalPages={paginationTotalPages || totalPages}
          />
        </Box>
      )}
    </Box>
  );
}

DataTable.defaultProps = {
  breakpoint: 768,
  clean: false,
  loading: false,
  maxRows: 10,
  pagination: true,
  responsive: false,
  scrollDuration: 400,
  scrollMargin: 16,
};
