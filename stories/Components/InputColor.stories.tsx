import { Meta, StoryObj } from '@storybook/react';

import { InputColor } from 'src/InputColor';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof InputColor>;

export default {
  title: 'Components/InputColor',
  component: InputColor,
  args: {
    ...InputColor.defaultProps,
    name: 'color',
  },
  argTypes: {
    ...hideProps(),
    height: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof InputColor>;

export const Basic: Story = {};
