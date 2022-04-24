import * as React from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';

import { Button, Grid, Group, Icon } from '../../src';
import { ButtonProps } from '../../src/Button';
import { variants } from '../../src/modules/theme';
import * as Types from '../../src/types';
import { Icons } from '../../src/types';
import { hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    ...hideProps(),
    children: { control: 'text' },
    size: { control: 'select', defaultValue: 'md' },
    invert: { control: 'boolean', defaultValue: false },
    transparent: { defaultValue: false },
    busy: { defaultValue: false },
    square: { defaultValue: false },
    wide: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    block: { control: 'boolean', defaultValue: false },
    variant: { control: 'select', defaultValue: 'primary' },
    shade: { control: 'select', defaultValue: 'mid' },
    type: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (props: any) => {
  return <Button {...props} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'Button',
};

export function Sizes(props: any) {
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

export function Colors(props: any) {
  return (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {[...Object.keys(variants), 'black', 'white'].map(d => (
        <Button key={d} onClick={action('clicked')} {...props} variant={d as Types.Colors}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  );
}

Colors.argTypes = {
  variant: hideTable(),
};

export function Shades(props: any) {
  return (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {Object.keys(variants.primary).map(d => (
        <Button key={d} onClick={action('clicked')} {...props} shade={d as keyof Types.Shades}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  );
}

Shades.argTypes = {
  shade: hideTable(),
};

export function WithIcons(props: any) {
  return (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      {['arrow-left', 'arrow-up', 'arrow-down', 'arrow-right'].map(d => (
        <Button key={d} onClick={action('clicked')} {...props} square>
          <Icon name={d as Icons} size={18} />
        </Button>
      ))}
    </Grid>
  );
}

WithIcons.argTypes = {
  square: hideTable(),
};
