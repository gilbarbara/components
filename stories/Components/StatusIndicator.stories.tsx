import { Meta } from '@storybook/react';

import { Box, Grid, Paragraph } from 'src';
import { StatusIndicator, StatusIndicatorProps } from 'src/StatusIndicator';

import { colorProps, disableControl, hideProps, marginProps, variants } from '../__helpers__';

export default {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  args: StatusIndicator.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} as Meta<typeof StatusIndicator>;

export const Basic = {};

export const Variants = {
  render: (props: StatusIndicatorProps) => (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {variants.map(d => (
        <Box key={d} align="center" direction="column" display="flex">
          <StatusIndicator key={d} {...props} variant={d} />
          <Paragraph>{d}</Paragraph>
        </Box>
      ))}
    </Grid>
  ),

  argTypes: {
    variant: disableControl(),
  },
};
