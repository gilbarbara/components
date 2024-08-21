import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps, PANGRAM } from '~/stories/__helpers__';

import { Jumbo } from './index';
import { jumboDefaultProps } from './useHeading';

type Story = StoryObj<typeof Jumbo>;

export default {
  title: 'Content/Headings',
  component: Jumbo,
  args: {
    ...jumboDefaultProps,
    align: 'center',
    children: PANGRAM,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
  parameters: {
    display: 'block',
  },
} satisfies Meta<typeof Jumbo>;

export const BasicJumbo: Story = {
  name: 'Jumbo',
};
