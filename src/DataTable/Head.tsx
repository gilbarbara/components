import { memo, MouseEventHandler, ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { DataTableProps } from './index';

import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';
import { getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';

interface Props extends Pick<DataTableProps, 'clean' | 'columns'> {
  isDisabled: boolean;
  isResponsive: boolean;
  onClick: MouseEventHandler;
  sortBy: string;
  sortDirection: string;
}

const Title = styled(
  ButtonBase,
  getStyledOptions(),
)<{ disableSort?: boolean; isDisabled: boolean }>(props => {
  const { disableSort, isDisabled } = props;

  return css`
    align-items: center;
    display: flex;
    pointer-events: ${disableSort || isDisabled ? 'none' : 'all'};
  `;
});

function DataTableHead(props: Props): JSX.Element | null {
  const { clean, columns, isDisabled, isResponsive, onClick, sortBy, sortDirection } = props;
  const { colors } = getTheme({ theme: useTheme() });

  if (isResponsive) {
    return null;
  }

  return (
    <Box data-component-name="DataTableHead" display="flex">
      {columns.map(({ disableSort, key, max, min, size, title }) => {
        let icon: ReactNode;

        if (!disableSort) {
          icon = <Icon ml="xxs" name="sort" size={20} />;

          if (key === sortBy) {
            icon =
              sortDirection === 'asc' ? (
                <Icon color={colors.primary} ml="xxs" name="sort-asc" size={20} />
              ) : (
                <Icon color={colors.primary} ml="xxs" name="sort-desc" size={20} />
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
            maxWidth={max || size}
            mb="sm"
            minWidth={min || size}
            pr={clean ? 'sm' : undefined}
            px={!clean ? 'md' : undefined}
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

export default memo(DataTableHead);
