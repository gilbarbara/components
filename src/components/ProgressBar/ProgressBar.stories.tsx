import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, ProgressBar } from './ProgressBar';

type Story = StoryObj<typeof ProgressBar>;

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  args: {
    ...defaultProps,
    step: 1,
    steps: 4,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'backgroundColor']),
    ...marginProps(),
  },
} satisfies Meta<typeof ProgressBar>;

export const Basic: Story = {};
