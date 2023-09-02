import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, hideTable } from '~/stories/__helpers__';

import { defaultProps, Loader } from './Loader';

type Story = StoryObj<typeof Loader>;

export default {
  title: 'Feedback/Loader',
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
