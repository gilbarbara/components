import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, SkeletonText } from 'src/Skeleton/SkeletonText';

import { hideProps, layoutProps, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof SkeletonText>;

export default {
  title: 'Components/Skeleton',
  component: SkeletonText,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...spacingProps(),
  },
  parameters: {
    align: 'stretch',
  },
} satisfies Meta<typeof SkeletonText>;

export const Text: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};
