import { useTheme } from '@emotion/react';
import { ComponentMeta } from '@storybook/react';
import { Grid } from 'src';
import { Toggle, ToggleProps } from 'src/Toggle';

import { getTheme } from 'src/modules/helpers';

import * as Types from 'src/types';

import { colorProps, disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    defaultChecked: false,
    disabled: false,
    label: 'Toggle',
    name: 'toggle',
    variant: 'primary',
    shade: 'mid',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    label: { control: 'text' },
  },
} as ComponentMeta<typeof Toggle>;

export const Basic = (props: ToggleProps) => <Toggle {...props} />;

export const Colors = (props: ToggleProps) => {
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
};

Colors.argTypes = {
  label: disableControl(),
  name: disableControl(),
  variant: disableControl(),
};
