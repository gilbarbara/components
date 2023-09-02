import { Meta, StoryObj } from '@storybook/react';

import { hideProps } from '~/stories/__helpers__';

import { Emoji } from './Emoji';

type Story = StoryObj<typeof Emoji>;

export default {
  title: 'Media/Emoji',
  component: Emoji,
  args: {
    label: 'Unicorn',
    size: 64,
    symbol: '🦄',
  },
  argTypes: hideProps(),
} satisfies Meta<typeof Emoji>;

export const Basic: Story = {};
