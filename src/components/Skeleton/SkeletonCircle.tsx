import { forwardRef } from 'react';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { Skeleton } from './Skeleton';
import { baseDefaultProps, SkeletonCircleProps } from './utils';

export const defaultProps = {
  ...baseDefaultProps,
  size: 48,
} satisfies SkeletonCircleProps;

export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>((props, ref) => {
  const { size, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

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
