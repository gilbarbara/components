import { Meta, StoryObj } from '@storybook/react';

import { Jumbo } from 'src/Headings';

import { colorProps, hideProps, marginProps } from '../../__helpers__';

type Story = StoryObj<typeof Jumbo>;

export default {
  title: 'Components/Headings',
  component: Jumbo,
  args: {
    ...Jumbo.defaultProps,
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
