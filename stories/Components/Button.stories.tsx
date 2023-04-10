import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Icon, Spacer } from 'src';
import { Button, defaultProps } from 'src/Button';
import { sizes } from 'src/modules/options';
import * as Types from 'src/types';

import {
  colorProps,
  disableControl,
  hideProps,
  paddingProps,
  shades,
  variants,
} from '../__helpers__';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    ...defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...paddingProps(),
    children: { control: 'text' },
    onClick: { action: 'onClick' },
    size: { control: 'radio', options: sizes },
  },
} satisfies Meta<typeof Button>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer>
      {['sm', 'md', 'lg'].map(d => (
        <Button key={d} {...props} size={d as Types.Sizes}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Spacer>
  ),
};

export const Variants: Story = {
  argTypes: {
    variant: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {variants.map(d => (
        <Button key={d} {...props} variant={d}>
          Button {capitalize(d)}
        </Button>
      ))}
      <Button onClick={action('clicked')} {...props} variant="black">
        Button Black
      </Button>
      <Button onClick={action('clicked')} {...props} variant="white">
        Button White
      </Button>
    </Grid>
  ),
};

export const Shades: Story = {
  argTypes: {
    shade: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {shades.map(d => (
        <Button key={d} {...props} shade={d}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  ),
};

export const Shapes: Story = {
  argTypes: {
    shape: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(3, 1fr)">
      <Button {...props} shape="round">
        <Icon name="arrow-down" size={18} />
      </Button>
      <Button {...props} shape="circle">
        <Icon name="check" size={28} />
      </Button>
      <Button {...props} shape="square">
        <Icon name="trash" size={18} />
      </Button>
    </Grid>
  ),
};
