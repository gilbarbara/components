import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, textOptionsProps } from '~/stories/__helpers__';

import { defaultProps, Quote } from './Quote';

type Story = StoryObj<typeof Quote>;

export default {
  title: 'Components/Quote',
  component: Quote,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...textOptionsProps(),
    attribution: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Quote>;

export const Basic: Story = {
  args: {
    attribution: 'Homer Simpson',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};
