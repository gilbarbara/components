import { Meta } from '@storybook/react';

import { Emoji } from 'src/Emoji';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Emoji',
  component: Emoji,
  args: {
    label: 'Unicorn',
    size: 64,
    symbol: '🦄',
  },
  argTypes: hideProps(),
} as Meta<typeof Emoji>;

export const Basic = {};
