import { forwardRef } from 'react';
import { createArray, mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { Skeleton } from './Skeleton';
import { baseDefaultProps, SkeletonTextProps } from './utils';

export const defaultProps = {
  ...baseDefaultProps,
  gap: 'xs',
  lines: 3,
  height: 16,
} satisfies SkeletonTextProps;

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>((props, ref) => {
  const { children, gap, height, isLoaded, lines, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  const getWidth = (index: number) => {
    if (lines > 1) {
      return index === lines ? '80%' : '100%';
    }

    return '100%';
  };

  return (
    <div ref={ref} {...getDataAttributes('SkeletonText')}>
      {createArray(lines).map((line, index) => {
        if (isLoaded && index > 0) {
          // skip other lines
          return null;
        }

        const sizeProps = isLoaded
          ? null
          : {
              mb: line === lines ? undefined : gap,
              width: getWidth(line),
              height,
            };

        return (
          <Skeleton key={lines.toString() + line} isLoaded={isLoaded} {...sizeProps} {...rest}>
            {
              // allows animating the children
              index === 0 ? children : undefined
            }
          </Skeleton>
        );
      })}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';
