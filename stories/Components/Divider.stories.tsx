import { Meta } from '@storybook/react';

import { Divider, DividerProps } from 'src/Divider';

import { Box } from '../../src';
import { colorProps, hideProps, marginProps, textOptionsProps } from '../__helpers__';

export default {
  title: 'Components/Divider',
  component: Divider,
  args: Divider.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
    length: { control: 'text' },
  },
} as Meta<typeof Divider>;

export const Basic = {};

export const Vertical = {
  args: {
    direction: 'vertical',
  },
  render: (props: DividerProps) => (
    <Box height={100}>
      <Divider {...props} />
    </Box>
  ),
};

export const WithText = {
  args: {
    children: 'Title',
  },
};
