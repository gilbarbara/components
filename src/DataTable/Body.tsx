import { memo } from 'react';

import type { DataTableProps } from './index';

import { Box } from '../Box';
import { Flex, FlexCenter } from '../Flex';
import { Loader } from '../Loader';
import { Paragraph } from '../Paragraph';

interface Props extends Pick<DataTableProps, 'columns' | 'data' | 'defaultColumn' | 'loading'> {
  isResponsive: boolean;
}

function DataTableBody(props: Props): JSX.Element {
  const { columns, data, defaultColumn, isResponsive, loading } = props;
  const isInitialLoad = loading && !data.length;

  return (
    <Box data-component-name="DataTableBody" minHeight={55} position="relative">
      {data.map((item, index) => (
        <Flex
          key={item.id || index}
          flexWrap={isResponsive ? 'wrap' : 'nowrap'}
          mb="sm"
          radius="sm"
          variant="white"
        >
          {columns.map(
            ({ hideOnResponsive, isAction, key, max, min, size, title }, columnIndex) => {
              let maxWidth = max || size;

              if (isResponsive && defaultColumn === key) {
                maxWidth = undefined;
              }

              return (
                <Flex
                  key={key}
                  alignItems="flex-start"
                  flex={1}
                  flexDirection="column"
                  flexWrap="wrap"
                  maxWidth={maxWidth}
                  minWidth={min || size}
                  order={isAction ? 1 : columnIndex + 1}
                  padding="md"
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
                </Flex>
              );
            },
          )}
        </Flex>
      ))}
      {loading && (
        <FlexCenter
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
        </FlexCenter>
      )}
    </Box>
  );
}

export default memo(DataTableBody);
