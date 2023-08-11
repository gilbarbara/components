import { Meta, StoryObj } from '@storybook/react';

import { Box, Grid, Paragraph } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  variants,
} from '~/stories/__helpers__';

import { defaultProps, StatusIndicator } from './StatusIndicator';

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
