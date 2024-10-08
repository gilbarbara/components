import { forwardRef } from 'react';
import { createArray } from '@gilbarbara/helpers';

import { Skeleton } from './Skeleton';
import { SkeletonTextProps, useSkeletonText } from './useSkeleton';

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useSkeletonText(props);
  const { children, gap, height, isLoaded, lines, ...rest } = componentProps;

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

export { textDefaultProps as defaultProps, type SkeletonTextProps } from './useSkeleton';
