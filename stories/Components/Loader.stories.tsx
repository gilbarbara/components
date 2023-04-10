import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Loader } from 'src/Loader';

import { colorProps, hideProps, hideTable } from '../__helpers__';

type Story = StoryObj<typeof Loader>;

export default {
  title: 'Components/Loader',
  component: Loader,
  args: {
    ...defaultProps,
    size: 128,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
  },
} satisfies Meta<typeof Loader>;

export const Pill: Story = {
  args: {
    type: 'pill',
  },
};

export const Grow: Story = {
  args: {
    type: 'grow',
  },
};

export const Pride: Story = {
  args: {
    type: 'pride',
  },
  argTypes: {
    color: hideTable(),
    shade: hideTable(),
    variant: hideTable(),
  },
};

export const Pulse: Story = {
  args: {
    type: 'pulse',
  },
};

export const Rotate: Story = {
  args: {
    type: 'rotate',
  },
};
