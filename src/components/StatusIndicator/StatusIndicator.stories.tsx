import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Box, Grid, Paragraph } from '~';

import { colors } from '~/modules/theme';

import { disableControl, hideProps, marginProps, variants } from '~/stories/__helpers__';

import { defaultProps, StatusIndicator } from './StatusIndicator';

type Story = StoryObj<typeof StatusIndicator>;

export default {
  title: 'Feedback/StatusIndicator',
  component: StatusIndicator,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    color: { control: 'select', options: objectKeys(colors) },
  },
} satisfies Meta<typeof StatusIndicator>;

export const Basic: Story = {};

export const Colors: Story = {
  argTypes: {
    color: disableControl(),
  },
  render: props => (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {variants.map(d => (
        <Box key={d} align="center" direction="column" display="flex">
          <StatusIndicator key={d} {...props} color={d} />
          <Paragraph>{d}</Paragraph>
        </Box>
      ))}
    </Grid>
  ),
};

export const CustomColor: Story = {
  args: {
    color: '#ff0044',
  },
};
