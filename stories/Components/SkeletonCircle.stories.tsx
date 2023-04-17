import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from 'src';
import { defaultProps, SkeletonCircle } from 'src/Skeleton/SkeletonCircle';

import { hideProps, hideTable, layoutProps, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof SkeletonCircle>;

export default {
  title: 'Components/Skeleton',
  component: SkeletonCircle,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...spacingProps(),
    radius: hideTable(),
  },
} satisfies Meta<typeof SkeletonCircle>;

export const Circle: Story = {
  args: {
    children: (
      <Avatar
        image="https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800"
        name="User"
        size="lg"
      />
    ),
  },
};
