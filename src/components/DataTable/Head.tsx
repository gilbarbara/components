import { memo, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import type { BoxProps } from '~/types/props';

import type { DataTableHeadProps } from './types';

const Title = styled(
  ButtonUnstyled,
  getStyledOptions(),
)<{ disableSort?: boolean; isDisabled: boolean }>(props => {
  const { disableSort, isDisabled } = props;

  return css`
    align-items: center;
    display: flex;
    pointer-events: ${disableSort || isDisabled ? 'none' : 'all'};
  `;
});

function DataTableHead(props: DataTableHeadProps) {
  const {
    accent,
    clean,
    columns,
    darkMode,
    isDisabled,
    isResponsive,
    onClick,
    sortBy,
    sortDirection,
    stickyHeader,
  } = props;

  if (isResponsive) {
    return null;
  }

  const wrapperProps: BoxProps = {
    bg: darkMode ? 'gray.900' : 'white',
    display: 'flex',
    radius: !clean ? 'xs' : undefined,
  };

  if (stickyHeader) {
    wrapperProps.position = 'sticky';
    wrapperProps.top = 0;
    wrapperProps.zIndex = 1;
  }

  return (
    <Box data-component-name="DataTableHead" {...wrapperProps}>
      {columns.map(({ disableSort, key, max, min, size, title }) => {
        let icon: ReactNode;

        if (!disableSort) {
          icon = <Icon ml="xxs" name="sort" size={20} />;

          if (key === sortBy) {
            icon =
              sortDirection === 'asc' ? (
                <Icon color={accent} ml="xxs" name="sort-asc" size={20} />
              ) : (
                <Icon color={accent} ml="xxs" name="sort-desc" size={20} />
              );
          }
        }

        return (
          <Box
            key={key}
            align="center"
            data-component-name="DataTableHeadColumn"
            direction="row"
            flex="grow"
            maxWidth={max ?? size}
            minWidth={min ?? size}
            my="xs"
            px={clean ? 'sm' : 'md'}
          >
            {title && (
              <Title
                data-direction={sortDirection}
                data-name={key}
                disableSort={disableSort}
                isDisabled={isDisabled}
                onClick={onClick}
              >
                {title}
                {icon}
              </Title>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

DataTableHead.displayName = 'DataTableHead';

export default memo(DataTableHead);
