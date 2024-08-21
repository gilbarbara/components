import { memo } from 'react';

import { Box } from '~/components/Box';
import { FlexCenter } from '~/components/Flex';
import { Loader } from '~/components/Loader';
import { Paragraph } from '~/components/Paragraph';

import { DataTableBodyProps, getBorder, getRowContent, getRowKey } from './useDataTable';

function DataTableBody(props: DataTableBodyProps) {
  const {
    accent,
    clean,
    columns,
    data,
    getDataAttributes,
    isResponsive,
    loaderSize,
    loaderType,
    loading,
    sortColumn,
    theme,
  } = props;
  const { darkMode } = theme;

  const isInitialLoad = loading && !data.length;

  return (
    <Box
      {...getDataAttributes('DataTableBody')}
      minHeight={55}
      mt={!clean ? 'sm' : undefined}
      pb={!clean ? 'sm' : undefined}
      position="relative"
    >
      {data.map((item, index) => (
        <Box
          key={getRowKey(item, index)}
          bg={darkMode ? 'gray.900' : 'white'}
          border={isResponsive ? getBorder(darkMode) : undefined}
          {...getDataAttributes('DataTableBodyRow')}
          display="flex"
          mt={!clean && index > 0 ? 'sm' : undefined}
          radius={clean ? undefined : 'xs'}
          wrap={isResponsive ? 'wrap' : 'nowrap'}
        >
          {columns.map(
            ({ hideOnResponsive, isAction, key, max, min, size, title }, columnIndex) => {
              let maxWidth = max ?? size;

              if (isResponsive && sortColumn === key) {
                maxWidth = undefined;
              }

              return (
                <Box
                  key={key}
                  align="flex-start"
                  border={clean && !isResponsive ? getBorder(darkMode) : undefined}
                  {...getDataAttributes('DataTableBodyColumn')}
                  direction="column"
                  display="flex"
                  flex="grow"
                  maxWidth={maxWidth}
                  minWidth={min ?? size}
                  order={isAction ? 1 : columnIndex + 1}
                  px={clean ? 'sm' : 'md'}
                  py={clean ? 'sm' : 'md'}
                  wrap="wrap"
                >
                  {isResponsive && !hideOnResponsive && (
                    <Paragraph
                      color="gray"
                      mb="xxs"
                      size="xs"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {title}
                    </Paragraph>
                  )}
                  {getRowContent(item, key)}
                </Box>
              );
            },
          )}
        </Box>
      ))}
      {loading && (
        <FlexCenter
          bg={!isInitialLoad ? 'rgba(200, 200, 200, 0.5)' : undefined}
          bottom={0}
          left={0}
          pointerEvents="fill"
          position="absolute"
          right={0}
          top={0}
          zIndex={10}
        >
          <Loader color={accent} size={loaderSize} type={loaderType} />
        </FlexCenter>
      )}
    </Box>
  );
}

DataTableBody.displayName = 'DataTableBody';

export default memo(DataTableBody);
