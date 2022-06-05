import { memo, MouseEventHandler, ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { DataTableProps } from './index';

import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';
import { getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';

interface Props extends Pick<DataTableProps, 'columns'> {
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
  const { columns, isDisabled, isResponsive, onClick, sortBy, sortDirection } = props;
  const { colors } = getTheme({ theme: useTheme() });

  if (isResponsive) {
    return null;
  }

  return (
    <Box data-component-name="DataTableHead" display="flex">
      {columns.map(({ disableSort, key, max, min, size, title }) => {
        let icon: ReactNode;

        if (!disableSort) {
          icon = <Icon ml="xxs" name="sort" />;

          if (key === sortBy) {
            icon =
              sortDirection === 'asc' ? (
                <Icon color={colors.primary} ml="xxs" name="sort-asc" />
              ) : (
                <Icon color={colors.primary} ml="xxs" name="sort-desc" />
              );
          }
        }

        return (
          <Box
            key={key}
            align="center"
            direction="row"
            flex="grow"
            maxWidth={max || size}
            mb="md"
            minWidth={min || size}
            px="md"
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
