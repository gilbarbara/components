import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import { Grid, Icon, Spacer } from 'src';
import { Button, ButtonProps } from 'src/Button';

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

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    ...Button.defaultProps,
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
} as ComponentMeta<typeof Button>;

export const Basic = (props: ButtonProps) => <Button {...props} />;

export const Sizes = (props: ButtonProps) => (
  <Spacer>
    {['sm', 'md', 'lg'].map(d => (
      <Button key={d} {...props} size={d as Types.Sizes}>
        Button {capitalize(d)}
      </Button>
    ))}
  </Spacer>
);

Sizes.argTypes = {
  size: disableControl(),
};

export const Variants = (props: ButtonProps) => (
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
);

Variants.argTypes = {
  variant: disableControl(),
};

export const Shades = (props: ButtonProps) => (
  <Grid gap={30} templateColumns="repeat(3, 1fr)">
    {shades.map(d => (
      <Button key={d} {...props} shade={d}>
        Button {capitalize(d)}
      </Button>
    ))}
  </Grid>
);

Shades.argTypes = {
  shade: disableControl(),
};

export const Shapes = (props: ButtonProps) => (
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
);

Shapes.argTypes = {
  shape: disableControl(),
};
