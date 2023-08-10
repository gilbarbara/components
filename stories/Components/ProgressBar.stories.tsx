import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, ProgressBar } from 'src/components/ProgressBar';

import { colorProps, hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof ProgressBar>;

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    ...defaultProps,
    step: 1,
    steps: 4,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof ProgressBar>;

export const Basic: Story = {};
