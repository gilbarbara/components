import { forwardRef } from 'react';

import { Skeleton } from './Skeleton';
import { SkeletonCircleProps, useSkeletonCircle } from './useSkeleton';

export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useSkeletonCircle(props);
  const { size, ...rest } = componentProps;

  return (
    <Skeleton
      ref={ref}
      {...getDataAttributes('SkeletonCircle')}
      {...rest}
      height={size}
      radius="round"
      width={size}
    />
  );
});

SkeletonCircle.displayName = 'SkeletonCircle';

export { circleDefaultProps as defaultProps, type SkeletonCircleProps } from './useSkeleton';
