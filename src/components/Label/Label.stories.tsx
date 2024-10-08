import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps, textOptionsProps } from '~/stories/__helpers__';

import { defaultProps, Label } from './Label';

type Story = StoryObj<typeof Label>;

export default {
  title: 'Components/Label',
  // category: 'Inputs',
  component: Label,
  args: {
    ...defaultProps,
    children: 'Far far away, behind the word mountains there live the blind texts.',
    labelInfo: '*',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    labelInfo: { control: 'text' },
  },
} satisfies Meta<typeof Label>;

export const Basic: Story = {};
