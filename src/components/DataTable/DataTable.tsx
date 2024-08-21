import { MouseEvent, useCallback, useMemo, useRef } from 'react';
import { useMount, useSetState, useUpdateEffect } from '@gilbarbara/hooks';

import { scrollTo } from '~/modules/animations';

import { Box } from '~/components/Box';
import { FlexCenter } from '~/components/Flex';
import { Pagination } from '~/components/Pagination';
import { Text } from '~/components/Text';

import { SortDirection } from '~/types';
import type { BoxProps } from '~/types/props';

import Body from './Body';
import Head from './Head';
import { DataTableProps, getBorder, sortData, useDataTable } from './useDataTable';

export function DataTable<TKeys extends string = string>(props: DataTableProps<TKeys>) {
  const {
    componentProps: {
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
    },
    getDataAttributes,
  } = useDataTable(props);
  const element = useRef<HTMLDivElement>(null);
  const resizeTimeout = useRef<number | null>(null);

  const { darkMode } = rest.theme;

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
        sortBy: name as TKeys,
        sortDirection: nextDirection,
      };

      onClickSort?.(name as TKeys, nextDirection);

      setState(options);
    },
    [onClickSort, setState, sortBy],
  );

  const isEmpty = !loading && !data.length;
  const rows = useMemo(() => {
    return (remote && !remote?.useInternalSorting) || !sortBy
      ? data
      : sortData<TKeys>(data, sortBy, sortDirection);
  }, [data, remote, sortBy, sortDirection]);

  const body = useMemo(() => {
    if (isEmpty) {
      return (
        <FlexCenter bg="white" padding="md" radius="sm" width="100%">
          {noResults ?? <Text bold>Nothing found</Text>}
        </FlexCenter>
      );
    }

    return (
      <Body
        accent={accent}
        clean={clean}
        columns={columns}
        data={rows.slice(maxRows * (currentPage - 1), maxRows * currentPage)}
        getDataAttributes={getDataAttributes}
        isResponsive={isResponsive}
        loaderSize={loaderSize}
        loaderType={loaderType}
        loading={loading}
        sortColumn={defaultSortColumn}
        theme={rest.theme}
      />
    );
  }, [
    accent,
    clean,
    columns,
    currentPage,
    defaultSortColumn,
    getDataAttributes,
    isEmpty,
    isResponsive,
    loaderSize,
    loaderType,
    loading,
    maxRows,
    noResults,
    rest.theme,
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
      {...getDataAttributes('DataTable')}
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
        getDataAttributes={getDataAttributes}
        isDisabled={loading ?? isEmpty}
        isResponsive={isResponsive}
        onClick={handleClickSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        stickyHeader={stickyHeader}
        theme={rest.theme}
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

export { defaultProps, type DataTableProps } from './useDataTable';
