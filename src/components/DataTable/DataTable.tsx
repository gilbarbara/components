import { MouseEvent, useCallback, useMemo, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { useMount, useSetState, useUpdateEffect } from '@gilbarbara/hooks';

import { scrollTo } from '~/modules/animations';

import { Box, BoxCenter } from '~/components/Box';
import { Pagination } from '~/components/Pagination';
import { Text } from '~/components/Text';

import { SortDirection } from '~/types';
import type { BoxProps } from '~/types/props';

import Body from './Body';
import Head from './Head';
import { DataTableProps } from './types';
import { getBorder, sortData } from './utils';

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

export function DataTable<T extends string = string>(props: DataTableProps<T>) {
  const {
    accent,
    bg,
    breakpoint,
    clean,
    columns,
    data,
    defaultSortColumn,
    defaultSortDirection,
    disableScroll,
    loaderSize,
    loaderType,
    loading,
    maxRows,
    noResults,
    onClickPage,
    onClickSort,
    pagination,
    radius,
    remote,
    responsive,
    scrollDuration,
    scrollElement,
    scrollMargin,
    stickyHeader,
    width,
    ...rest
  } = { ...defaultProps, ...props };
  const { darkMode = false } = useTheme();
  const element = useRef<HTMLDivElement>(null);
  const resizeTimeout = useRef<number | null>(null);

  const [{ currentPage, isResponsive, sortBy, sortDirection }, setState] = useSetState({
    currentPage: 1,
    isResponsive: responsive && (width ?? window.innerWidth) < breakpoint,
    sortBy: defaultSortColumn ?? null,
    sortDirection: defaultSortDirection,
  });

  useUpdateEffect(() => {
    const minLength = currentPage * maxRows - maxRows;

    if (data.length < minLength) {
      setState({ currentPage: 1 });
    }
  }, [currentPage, data.length, maxRows, setState]);

  useMount(() => {
    const resizeHandler = () => {
      if (resizeTimeout.current) {
        window.clearTimeout(resizeTimeout.current);
      }

      resizeTimeout.current = window.setTimeout(() => {
        setState({ isResponsive: responsive && (width ?? window.innerWidth) < breakpoint });
      }, 250);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  const totalPages = Math.ceil(data.length / maxRows);

  const handleClickPage = (page: number) => {
    const scrollTarget = scrollElement ?? element.current;

    onClickPage?.(page, remote?.totalPages ?? totalPages);

    if (scrollTarget && !disableScroll) {
      scrollTo(scrollTarget.getBoundingClientRect().top - scrollMargin, { scrollDuration });
    }

    if (remote) {
      return;
    }

    setState({ currentPage: page });
  };

  const handleClickSort = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { direction, name = '' } = event.currentTarget.dataset;
      const reverseDirection: SortDirection = direction === 'asc' ? 'desc' : 'asc';
      const nextDirection = sortBy === name ? reverseDirection : 'asc';

      const options = {
        sortBy: name as T,
        sortDirection: nextDirection,
      };

      onClickSort?.(name as T, nextDirection);

      setState(options);
    },
    [onClickSort, setState, sortBy],
  );

  const isEmpty = !loading && !data.length;
  const rows = useMemo(() => {
    return (remote && !remote?.useInternalSorting) || !sortBy
      ? data
      : sortData<T>(data, sortBy, sortDirection);
  }, [data, remote, sortBy, sortDirection]);

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
        accent={accent}
        clean={clean}
        columns={columns}
        darkMode={darkMode}
        data={rows.slice(maxRows * (currentPage - 1), maxRows * currentPage)}
        isResponsive={isResponsive}
        loaderSize={loaderSize}
        loaderType={loaderType}
        loading={loading}
        sortColumn={defaultSortColumn}
      />
    );
  }, [
    accent,
    clean,
    columns,
    currentPage,
    darkMode,
    defaultSortColumn,
    isEmpty,
    isResponsive,
    loaderSize,
    loaderType,
    loading,
    maxRows,
    noResults,
    rows,
  ]);

  const styles: BoxProps = {
    bg,
  };

  if (clean) {
    styles.bg = darkMode ? 'gray.900' : 'white';
    styles.pb = 'sm';
  }

  if (!clean) {
    styles.padding = 'md';

    if (!bg) {
      styles.bg = darkMode ? 'gray.800' : 'gray.50';
    }
  }

  return (
    <Box
      ref={element}
      data-component-name="DataTable"
      maxWidth="100%"
      radius={!clean ? radius : undefined}
      width={width}
      {...styles}
      {...rest}
    >
      <Head
        accent={accent}
        clean={clean}
        columns={columns}
        darkMode={darkMode}
        isDisabled={loading ?? isEmpty}
        isResponsive={isResponsive}
        onClick={handleClickSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        stickyHeader={stickyHeader}
      />
      {body}
      {pagination && (
        <Box border={clean ? getBorder(darkMode) : undefined} pt={clean ? 'sm' : undefined}>
          <Pagination
            accent={accent}
            currentPage={remote?.currentPage ?? currentPage}
            onClick={handleClickPage}
            totalPages={remote?.totalPages ?? totalPages}
          />
        </Box>
      )}
    </Box>
  );
}

DataTable.displayName = 'DataTable';
