import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import { Grid, Group, Icon } from 'src';
import { Button, ButtonProps } from 'src/Button';

import { sizes } from 'src/modules/options';

import * as Types from 'src/types';

import { hideProps, hideTable, shades, variants } from '../__helpers__';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    block: false,
    busy: false,
    children: 'Button',
    disabled: false,
    invert: false,
    shade: 'mid',
    size: 'md',
    square: false,
    transparent: false,
    type: 'button',
    variant: 'primary',
    wide: false,
  },
  argTypes: {
    ...hideProps(),
    size: { control: 'radio', options: sizes },
  },
} as ComponentMeta<typeof Button>;

export function Basic(props: ButtonProps) {
  return <Button {...props} />;
}

export function Sizes(props: ButtonProps) {
  return (
    <Group>
      {['sm', 'md', 'lg'].map(d => (
        <Button key={d} onClick={action('clicked')} {...props} size={d as Types.Sizes}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Group>
  );
}

Sizes.argTypes = {
  size: hideTable(),
};

export function Colors(props: ButtonProps) {
  return (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {variants.map(d => (
        <Button key={d} onClick={action('clicked')} {...props} variant={d}>
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
}

Colors.argTypes = {
  variant: hideTable(),
};

export function Shades(props: ButtonProps) {
  return (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {shades.map(d => (
        <Button key={d} onClick={action('clicked')} {...props} shade={d}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  );
}

Shades.argTypes = {
  shade: hideTable(),
};

export function WithIcons(props: ButtonProps) {
  return (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      {['arrow-left', 'arrow-up', 'arrow-down', 'arrow-right'].map(d => (
        <Button key={d} onClick={action('clicked')} {...props} square>
          <Icon name={d as Types.Icons} size={18} />
        </Button>
      ))}
    </Grid>
  );
}

WithIcons.argTypes = {
  square: hideTable(),
};
