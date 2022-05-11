import { Box } from 'src';
import { Grid, GridProps } from 'src/Grid';

import {
  colorProps,
  flexContent,
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
    templateColumns: 'repeat(3, 120px)',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...layoutProps({ display: 'grid' }),
    ...positioningProps(),
    ...spacingProps(),
    alignContent: { options: flexContent },
    alignItems: { options: flexItems },
    autoColumns: { control: 'text' },
    autoFlow: { control: 'text' },
    autoRows: { control: 'text' },
    columnGap: { control: 'text' },
    display: { control: 'radio', options: ['grid', 'inline-grid'] },
    gap: { control: 'text' },
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
