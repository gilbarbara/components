import { Meta, StoryObj } from '@storybook/react';

import { Box } from '~';

import {
  colorProps,
  hideProps,
  marginProps,
  spacingProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { defaultProps, Divider } from './Divider';

type Story = StoryObj<typeof Divider>;

export default {
  title: 'Display/Divider',
  component: Divider,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    ...spacingProps('spacing'),
    children: { control: 'text' },
    length: { control: 'text' },
  },
} satisfies Meta<typeof Divider>;

export const Basic: Story = {};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: props => (
    <Box height={100}>
      <Divider {...props} />
    </Box>
  ),
};

export const WithText: Story = {
  args: {
    children: 'Title',
  },
};
