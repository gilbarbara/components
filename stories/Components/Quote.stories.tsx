import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Quote } from 'src/Quote';

import { colorProps, hideProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof Quote>;

export default {
  title: 'Components/Quote',
  component: Quote,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...textOptionsProps(),
    attribution: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Quote>;

export const Basic: Story = {
  args: {
    attribution: 'Hommer Simpson',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};
