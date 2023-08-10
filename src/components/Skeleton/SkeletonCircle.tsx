import { forwardRef } from 'react';

import { Skeleton } from './Skeleton';
import { baseDefaultProps, SkeletonCircleProps } from './utils';

export const defaultProps = {
  ...baseDefaultProps,
  size: 48,
} satisfies SkeletonCircleProps;

export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>((props, ref) => {
  const { size, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Skeleton
      ref={ref}
      data-component-name="SkeletonCircle"
      {...rest}
      height={size}
      radius="round"
      width={size}
    />
  );
});

SkeletonCircle.displayName = 'SkeletonCircle';
