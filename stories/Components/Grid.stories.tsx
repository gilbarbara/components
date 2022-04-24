import * as React from 'react';

import { Box, Grid } from '../../src';
import { flexContent, flexItems, hideProps } from '../__helpers__';

export default {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    ...hideProps('textAlign'),
    alignContent: {
      control: 'select',
      options: flexContent,
      defaultValue: 'space-evenly',
    },
    alignItems: {
      control: 'select',
      options: flexItems,
      defaultValue: 'center',
    },
    autoColumns: { control: 'text' },
    autoFlow: { control: 'text' },
    autoRows: { control: 'text' },
    columnGap: { control: 'text' },
    display: { control: 'radio', options: ['grid', 'inline-grid'], defaultValue: 'grid' },
    gap: { control: 'text' },
    grid: { control: 'text' },
    justifyContent: {
      control: 'select',
      options: flexContent,
      defaultValue: 'space-evenly',
    },
    justifyItems: {
      control: 'select',
      options: flexItems,
      defaultValue: 'center',
    },
    placeContent: { control: 'text' },
    placeItems: { control: 'text' },
    rowGap: { control: 'text' },
    template: { control: 'text' },
    templateAreas: { control: 'text' },
    templateColumns: { control: 'text', defaultValue: 'repeat(3, 120px)' },
    templateRows: { control: 'text' },
    itemHeight: { control: 'number', defaultValue: 100 },
    itemWidth: { control: 'number', defaultValue: 100 },
  },
};

export const Basic = (props: any) => {
  const { itemHeight, itemWidth, ...rest } = props;

  return (
    <Grid {...rest} minHeight="90vh" shadow="high" variant="white" width="90%">
      <Box minHeight={itemHeight} variant="primary" width={itemWidth} />
      <Box minHeight={itemHeight} variant="secondary" width={itemWidth} />
      <Box minHeight={itemHeight} variant="green" width={itemWidth} />
      <Box minHeight={itemHeight} variant="pink" width={itemWidth} />
      <Box minHeight={itemHeight} variant="purple" width={itemWidth} />
      <Box minHeight={itemHeight} variant="red" width={itemWidth} />
      <Box minHeight={itemHeight} variant="yellow" width={itemWidth} />
      <Box minHeight={itemHeight} variant="primary" width={itemWidth} />
    </Grid>
  );
};
