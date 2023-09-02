import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps } from '~/stories/__helpers__';

import { Jumbo } from './index';
import { jumboDefaultProps } from './utils';

type Story = StoryObj<typeof Jumbo>;

export default {
  title: 'Content/Headings',
  component: Jumbo,
  args: {
    ...jumboDefaultProps,
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof Jumbo>;

export const BasicJumbo: Story = {
  name: 'Jumbo',
};
