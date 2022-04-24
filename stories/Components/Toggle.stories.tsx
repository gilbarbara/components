import * as React from 'react';
import { useTheme } from '@emotion/react';
import { ComponentMeta } from '@storybook/react';

import { Grid, Toggle } from '../../src';
import { getTheme } from '../../src/modules/helpers';
import * as Types from '../../src/types';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    ...hideProps('defaultChecked', 'onChange', 'onClick'),
    label: { control: 'text', defaultValue: 'Toggle' },
    name: { defaultValue: 'toggle' },
    variant: { control: 'select', defaultValue: 'primary' },
    shade: { control: 'select', defaultValue: 'mid' },
  },
} as ComponentMeta<typeof Toggle>;

export const Basic = (props: any) => {
  return <Toggle {...props} />;
};

export function Colors(props: any) {
  const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

  return (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {[...Object.keys(variants), 'black', 'white'].map(color => (
        <Toggle key={color} name={color} {...props} defaultChecked label={color} variant={color} />
      ))}
    </Grid>
  );
}

Colors.argTypes = {
  label: {
    table: { disable: true },
  },
  name: {
    table: { disable: true },
  },
  variant: {
    table: { disable: true },
  },
};
