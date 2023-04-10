import { Meta, StoryObj } from '@storybook/react';

import { Box, Grid, Paragraph } from 'src';
import { defaultProps, StatusIndicator } from 'src/StatusIndicator';

import { colorProps, disableControl, hideProps, marginProps, variants } from '../__helpers__';

type Story = StoryObj<typeof StatusIndicator>;

export default {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof StatusIndicator>;

export const Basic: Story = {};

export const Variants: Story = {
  argTypes: {
    variant: disableControl(),
  },
  render: props => (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {variants.map(d => (
        <Box key={d} align="center" direction="column" display="flex">
          <StatusIndicator key={d} {...props} variant={d} />
          <Paragraph>{d}</Paragraph>
        </Box>
      ))}
    </Grid>
  ),
};
