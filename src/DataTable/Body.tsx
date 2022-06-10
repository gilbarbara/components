import { memo } from 'react';

import type { DataTableProps } from './index';

import { Box, BoxCenter } from '../Box';
import { Loader } from '../Loader';
import { Paragraph } from '../Paragraph';

interface Props
  extends Pick<DataTableProps, 'clean' | 'columns' | 'data' | 'defaultColumn' | 'loading'> {
  isResponsive: boolean;
}

function DataTableBody(props: Props): JSX.Element {
  const { clean, columns, data, defaultColumn, isResponsive, loading } = props;
  const isInitialLoad = loading && !data.length;

  return (
    <Box data-component-name="DataTableBody" minHeight={55} position="relative">
      {data.map((item, index) => (
        <Box
          key={item.id || index}
          data-component-name="DataTableBodyRow"
          display="flex"
          mb="sm"
          radius={clean ? undefined : 'sm'}
          variant={clean ? undefined : 'white'}
          wrap={isResponsive ? 'wrap' : 'nowrap'}
        >
          {columns.map(
            ({ hideOnResponsive, isAction, key, max, min, size, title }, columnIndex) => {
              let maxWidth = max || size;

              if (isResponsive && defaultColumn === key) {
                maxWidth = undefined;
              }

              return (
                <Box
                  key={key}
                  align="flex-start"
                  border={clean ? [{ side: 'top' }] : undefined}
                  data-component-name="DataTableBodyColumn"
                  direction="column"
                  display="flex"
                  flex="grow"
                  maxWidth={maxWidth}
                  minWidth={min || size}
                  order={isAction ? 1 : columnIndex + 1}
                  padding={!clean ? 'md' : undefined}
                  pt={clean ? 'sm' : undefined}
                  wrap="wrap"
                >
                  {isResponsive && !hideOnResponsive && (
                    <Paragraph
                      mb="xxs"
                      size="small"
                      style={{ textTransform: 'uppercase' }}
                      variant="gray"
                    >
                      {title}
                    </Paragraph>
                  )}
                  {item[key]}
                </Box>
              );
            },
          )}
        </Box>
      ))}
      {loading && (
        <BoxCenter
          bottom={0}
          left={0}
          opacity={isInitialLoad ? 1 : 0.5}
          pointerEvents="fill"
          position="absolute"
          right={0}
          top={0}
          variant={!isInitialLoad ? 'gray' : undefined}
          zIndex={10}
        >
          <Loader />
        </BoxCenter>
      )}
    </Box>
  );
}

export default memo(DataTableBody);
