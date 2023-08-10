import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Label } from 'src/components/Label';

import { hideProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof Label>;

export default {
  title: 'Components/Label',
  component: Label,
  args: {
    ...defaultProps,
    children: 'Far far away, behind the word mountains there live the blind texts.',
    labelInfo: '*',
  },
  argTypes: {
    ...hideProps(),
    ...textOptionsProps(),
    labelInfo: { control: 'text' },
  },
} satisfies Meta<typeof Label>;

export const Basic: Story = {};
