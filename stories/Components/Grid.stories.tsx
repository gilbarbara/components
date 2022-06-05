import { Box } from 'src';
import { Grid, GridProps } from 'src/Grid';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItemProps,
  flexItems,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Grid',
  component: Grid,
  args: {
    alignContent: 'space-evenly',
    alignItems: 'center',
    display: 'grid',
    gap: 16,
    itemHeight: 100,
    itemWidth: 100,
    justifyContent: 'space-evenly',
    justifyItems: 'center',
    templateColumns: 'repeat(3, auto)',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'grid' }),
    ...positioningProps(),
    ...spacingProps(),
    alignContent: { options: flexContent },
    alignItems: { options: flexItems },
    autoColumns: { control: 'text' },
    autoFlow: { control: 'text' },
    autoRows: { control: 'text' },
    columnGap: { control: 'text' },
    children: disableControl(),
    display: { control: 'radio', options: ['grid', 'inline-grid'] },
    gap: { control: 'number' },
    grid: { control: 'text' },
    itemHeight: { control: 'number', description: 'Storybook only' },
    itemWidth: { control: 'number', description: 'Storybook only' },
    justifyContent: { options: flexContent },
    justifyItems: { options: flexItems },
    placeContent: { control: 'text' },
    placeItems: { control: 'text' },
    rowGap: { control: 'text' },
    template: { control: 'text' },
    templateAreas: { control: 'text' },
    templateRows: { control: 'text' },
  },
};

export const Basic = (props: GridProps & { itemHeight: number; itemWidth: number }) => {
  const { itemHeight, itemWidth, ...rest } = props;

  return (
    <Grid {...rest} minHeight="90vh" shadow="high" variant="white" width="90%">
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="primary" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="secondary" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="green" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="pink" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="purple" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="red" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="yellow" />
      <Box minHeight={itemHeight} minWidth={itemWidth} variant="primary" />
    </Grid>
  );
};
