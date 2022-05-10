import { ComponentMeta } from '@storybook/react';
import { Box, Grid, Paragraph } from 'src';
import { StatusIndicator, StatusIndicatorProps } from 'src/StatusIndicator';

import { hideProps, hideTable, variants } from '../__helpers__';

export default {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  args: {
    ratio: 0.7,
    size: 24,
    shade: 'mid',
    variant: 'green',
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof StatusIndicator>;

export const Basic = (props: StatusIndicatorProps) => {
  return <StatusIndicator {...props} />;
};

export const Variants = (props: StatusIndicatorProps) => {
  return (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {variants.map(d => (
        <Box key={d} textAlign="center">
          <StatusIndicator key={d} variant={d} {...props} />
          <Paragraph>{d}</Paragraph>
        </Box>
      ))}
    </Grid>
  );
};

Variants.argTypes = {
  variant: hideTable(),
};
