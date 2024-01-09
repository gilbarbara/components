import { memo } from 'react';

import { Box, BoxCenter } from '~/components/Box';
import { getBorder, getRowContent, getRowKey } from '~/components/DataTable/utils';
import { Loader } from '~/components/Loader';
import { Paragraph } from '~/components/Paragraph';

import { DataTableBodyProps } from './types';

function DataTableBody(props: DataTableBodyProps) {
  const {
    accent,
    clean,
    columns,
    darkMode,
    data,
    isResponsive,
    loaderSize,
    loaderType,
    loading,
    sortColumn,
  } = props;
  const isInitialLoad = loading && !data.length;

  return (
    <Box
      data-component-name="DataTableBody"
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
          data-component-name="DataTableBodyRow"
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
                  data-component-name="DataTableBodyColumn"
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
        <BoxCenter
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
        </BoxCenter>
      )}
    </Box>
  );
}

DataTableBody.displayName = 'DataTableBody';

export default memo(DataTableBody);
