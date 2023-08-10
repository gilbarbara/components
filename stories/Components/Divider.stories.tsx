import { Meta, StoryObj } from '@storybook/react';

import { Box } from 'src';
import { defaultProps, Divider } from 'src/components/Divider';

import { colorProps, hideProps, marginProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof Divider>;

export default {
  title: 'Components/Divider',
  component: Divider,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
    length: { control: 'text' },
  },
} satisfies Meta<typeof Divider>;

export const Basic: Story = {};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
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
