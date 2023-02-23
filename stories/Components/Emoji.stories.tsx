import { Meta, StoryObj } from '@storybook/react';

import { Emoji } from 'src/Emoji';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof Emoji>;

export default {
  title: 'Components/Emoji',
  component: Emoji,
  args: {
    label: 'Unicorn',
    size: 64,
    symbol: '🦄',
  },
  argTypes: hideProps(),
} satisfies Meta<typeof Emoji>;

export const Basic: Story = {};
