import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '~';

import { hideProps, hideTable, layoutProps, spacingProps } from '~/stories/__helpers__';

import { defaultProps, SkeletonCircle } from './SkeletonCircle';

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
