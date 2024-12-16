import { memo, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Flex } from '~/components/Flex';
import { Icon } from '~/components/Icon';
import { Menu, MenuItem } from '~/components/Menu';

import type { BoxProps } from '~/types/props';

import type { DataTableHeadProps } from './useDataTable';

const Title = styled(
  ButtonUnstyled,
  getStyledOptions(),
)<{ disableSort?: boolean; isDisabled: boolean }>(props => {
  const { disableSort, isDisabled } = props;

  return css`
    align-items: center;
    display: flex;
    font-weight: 700;
    pointer-events: ${disableSort || isDisabled ? 'none' : 'all'};
  `;
});

function DataTableHead(props: DataTableHeadProps) {
  const {
    accent,
    clean,
    columns,
    getDataAttributes,
    isDisabled,
    isResponsive,
    onClick,
    sortBy,
    sortDirection,
    stickyHeader,
    theme: { black, darkMode, white, zIndex },
  } = props;

  const color = darkMode ? white : black;

  if (isResponsive) {
    return (
      <Flex justify="end">
        <Menu
          button={<Icon name="sort" size={24} title={null} />}
          labels={{ close: 'Close sort', name: 'Sort menu', open: 'Open sort' }}
        >
          {columns
            .filter(d => !d.disableSort)
            .map(({ key, title }) => (
              <MenuItem key={key} accent="white" disableHover>
                <Flex flex justify="space-between">
                  {title}

                  <Flex>
                    <ButtonUnstyled
                      aria-label={`Sort by ${title} - asc`}
                      data-direction="desc"
                      data-name={key}
                      onClick={onClick}
                    >
                      <Icon
                        color={key === sortBy && sortDirection === 'asc' ? accent : color}
                        name="sort-asc"
                        size={20}
                      />
                    </ButtonUnstyled>

                    <ButtonUnstyled
                      aria-label={`Sort by ${title} - desc`}
                      data-direction="asc"
                      data-name={key}
                      onClick={onClick}
                    >
                      <Icon
                        color={key === sortBy && sortDirection === 'desc' ? accent : color}
                        name="sort-desc"
                        size={20}
                      />
                    </ButtonUnstyled>
                  </Flex>
                </Flex>
              </MenuItem>
            ))}
        </Menu>
      </Flex>
    );
  }

  const wrapperProps: BoxProps = {
    bg: darkMode ? 'gray.900' : 'white',
    display: 'flex',
    radius: !clean ? 'xs' : undefined,
  };

  if (stickyHeader) {
    wrapperProps.position = 'sticky';
    wrapperProps.top = 0;
    wrapperProps.zIndex = zIndex.xxs;
  }

  return (
    <Box {...getDataAttributes('DataTableHead')} {...wrapperProps}>
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
            {...getDataAttributes('DataTableHeadColumn')}
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
