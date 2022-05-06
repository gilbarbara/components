import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Box, Grid, Paragraph, StatusIndicator } from '../../src';
import { hideProps, hideTable, variants } from '../__helpers__';

export default {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    ...hideProps(),
    ratio: { defaultValue: 0.7 },
    size: { defaultValue: 24 },
    status: { control: 'select', defaultValue: 'active' },
  },
} as ComponentMeta<typeof StatusIndicator>;

export const Basic = (props: any) => {
  return <StatusIndicator {...props} />;
};

export const Variants = (props: any) => {
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
