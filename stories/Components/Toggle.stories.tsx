/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from '@emotion/react';
import { Meta } from '@storybook/react';

import { Grid } from 'src';
import { getTheme } from 'src/modules/helpers';
import { Toggle, ToggleProps } from 'src/Toggle';
import * as Types from 'src/types';

import { colorProps, disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    ...Toggle.defaultProps,
    label: 'Toggle',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    label: { control: 'text' },
  },
} as Meta<typeof Toggle>;

export const Basic = {};

export const Sizes = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    size: disableControl(),
  },
  render: (props: ToggleProps) => {
    return (
      <Grid gap={30} templateColumns="repeat(3, 1fr)">
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Toggle key={size} {...props} defaultChecked label={size} size={size} />
        ))}
      </Grid>
    );
  },
};

export const Variants = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    variant: disableControl(),
  },
  render: (props: ToggleProps) => {
    const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

    return (
      <Grid gap={30} templateColumns="repeat(3, 1fr)">
        {[...Object.keys(variants), 'black', 'white'].map(color => (
          <Toggle
            key={color}
            {...props}
            defaultChecked
            label={color}
            name={color}
            variant={color as Types.Variants}
          />
        ))}
      </Grid>
    );
  },
};
