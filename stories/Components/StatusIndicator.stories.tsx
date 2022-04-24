import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Box, Grid, Paragraph, StatusIndicator } from '../../src';
import { variants as variantsMap } from '../../src/modules/theme';
import { Variants as VariantsType } from '../../src/types';
import { hideProps } from '../__helpers__';

const variants = Object.keys(variantsMap) as VariantsType[];

export default {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    ...hideProps(),
    ratio: { defaultValue: 0.7 },
    size: { defaultValue: 20 },
    status: { control: 'select', defaultValue: 'active' },
  },
} as ComponentMeta<typeof StatusIndicator>;

export const Basic = (props: any) => {
  return <StatusIndicator {...props} />;
};

export const Variants = () => {
  return (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {variants.map(d => (
        <Box textAlign="center">
          <StatusIndicator key={d} variant={d} />
          <Paragraph>{d}</Paragraph>
        </Box>
      ))}
    </Grid>
  );
};
