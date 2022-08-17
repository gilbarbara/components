import { ComponentMeta } from '@storybook/react';

import { Divider, DividerProps } from 'src/Divider';

import { Box } from '../../src';
import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Divider',
  component: Divider,
  args: Divider.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    children: { control: 'text' },
    length: { control: 'text' },
  },
} as ComponentMeta<typeof Divider>;

export const Basic = (props: DividerProps) => <Divider {...props} />;

export const Vertical = (props: DividerProps) => (
  <Box height={100}>
    <Divider {...props} />
  </Box>
);

Vertical.args = {
  direction: 'vertical',
};

export const WithText = (props: DividerProps) => <Divider {...props} />;

WithText.args = {
  children: 'Title',
};
