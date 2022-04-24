import * as React from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { DataTableProps } from './index';

import { ButtonBase } from '../ButtonBase';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { getTheme } from '../modules/helpers';
import { styledOptions } from '../modules/system';

interface Props extends Pick<DataTableProps, 'columns'> {
  isDisabled: boolean;
  isResponsive: boolean;
  onClick: React.MouseEventHandler;
  sortBy: string;
  sortDirection: string;
}

const Title = styled(
  ButtonBase,
  styledOptions,
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
    <Flex data-component-name="DataTableHead">
      {columns.map(({ disableSort, key, max, min, size, title }) => {
        let icon: React.ReactNode;

        if (!disableSort) {
          icon = <Icon ml="xxs" name="sort" />;

          if (key === sortBy) {
            icon =
              sortDirection === 'asc' ? (
                <Icon color={colors.primary} ml="xxs" name="sort-az" />
              ) : (
                <Icon color={colors.primary} ml="xxs" name="sort-za" />
              );
          }
        }

        return (
          <Flex
            key={key}
            alignItems="center"
            flex={1}
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
          </Flex>
        );
      })}
    </Flex>
  );
}

export default React.memo(DataTableHead);
