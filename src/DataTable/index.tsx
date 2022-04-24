import * as React from 'react';
import innerText from 'react-innertext';
import { useSetState, useUpdateEffect } from 'react-use';
import { useTheme } from '@emotion/react';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';

import Body from './Body';
import Head from './Head';

import { Box, BoxProps } from '../Box';
import { FlexCenter } from '../Flex';
import { scrollTo } from '../modules/animations';
import { recursiveElementFind } from '../modules/helpers';
import { Pagination } from '../Pagination';
import { Text } from '../Text';

export interface DataTableColumn<T = string> {
  disableSort?: boolean;
  hideOnResponsive?: boolean;
  isAction?: boolean;
  key: T;
  max?: StringOrNumber;
  min?: StringOrNumber;
  size?: StringOrNumber;
  title: React.ReactNode;
}

export interface DataTableProps extends Omit<BoxProps, 'data'> {
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
  /** @default true */
  loading?: boolean;
  /** @default 10 */
  maxRows?: number;
  noResults?: React.ReactNode;
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
  style?: React.CSSProperties;
  /** @default window.innerWidth */
  width?: string | number;
}

function sortData(data: any[], sortBy: string, sortDirection: string) {
  return [...data].sort((a, b) => {
    let left = innerText(a[sortBy]);
    let right = innerText(b[sortBy]);

    if (sortBy === 'date') {
      left = recursiveElementFind(a[sortBy], { type: 'time', property: 'dateTime' }) || left;
      right = recursiveElementFind(b[sortBy], { type: 'time', property: 'dateTime' }) || right;
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
    loading = true,
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
  const element = React.useRef<HTMLDivElement>(null);

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

  const handleClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  const rows = React.useMemo(() => {
    return paginationServer ? data : sortData(data, sortBy, sortDirection);
  }, [data, paginationServer, sortBy, sortDirection]);

  const body = React.useMemo(() => {
    if (isEmpty) {
      return (
        <FlexCenter padding="md" radius="sm" variant="white" width="100%">
          {noResults || <Text bold>Nada encontrado</Text>}
        </FlexCenter>
      );
    }

    return (
      <Body
        columns={columns}
        data={rows.slice(maxRows * (currentPage - 1), maxRows * currentPage)}
        defaultColumn={defaultColumn}
        isResponsive={isResponsive}
        loading={loading}
      />
    );
  }, [
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
        columns={columns}
        isDisabled={loading || isEmpty}
        isResponsive={isResponsive}
        onClick={handleClickSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      {body}
      {pagination && (
        <Pagination
          currentPage={paginationCurrentPage || currentPage}
          onClick={handleClickPage}
          totalPages={paginationTotalPages || totalPages}
        />
      )}
    </Box>
  );
}

DataTable.defaultProps = {
  breakpoint: 768,
  loading: false,
  maxRows: 10,
  pagination: true,
  responsive: false,
};
