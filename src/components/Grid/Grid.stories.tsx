import { Meta, StoryObj } from '@storybook/react';

import { Box } from '~';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItemProps,
  flexItems,
  hideProps,
  layoutProps,
  positioningProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, Grid } from './Grid';

type Story = StoryObj<typeof Grid>;

export default {
  title: 'Layout/Grid',
  component: Grid,
  args: {
    ...defaultProps,
    alignContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-evenly',
    justifyItems: 'center',
    templateColumns: 'repeat(3, auto)',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexItemProps(),
    ...layoutProps({ display: 'grid' }),
    ...positioningProps(),
    ...radiusProps(),
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
    justifyContent: { options: flexContent },
    justifyItems: { options: flexItems },
    placeContent: { control: 'text' },
    placeItems: { control: 'text' },
    rowGap: { control: 'text' },
    template: { control: 'text' },
    templateAreas: { control: 'text' },
    templateRows: { control: 'text' },
  },
} satisfies Meta<typeof Grid>;

export const Basic: Story = {
  args: {
    bg: 'white',
    // @ts-expect-error - Storybook only
    itemHeight: 100,
    itemWidth: 100,
  },
  argTypes: {
    // @ts-expect-error - Storybook only
    itemHeight: { control: 'number', description: 'Storybook only' },
    itemWidth: { control: 'number', description: 'Storybook only' },
  },
  render: props => {
    // @ts-expect-error - Storybook only
    const { itemHeight, itemWidth, ...rest } = props;

    return (
      <Grid minHeight="90vh" shadow="high" width="90%" {...rest}>
        <Box bg="red" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="orange" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="yellow" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="green" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="teal" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="cyan" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="blue" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="purple" minHeight={itemHeight} minWidth={itemWidth} />
        <Box bg="pink" minHeight={itemHeight} minWidth={itemWidth} />
      </Grid>
    );
  },
};
