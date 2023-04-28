/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'src';
import { getTheme } from 'src/modules/helpers';
import { defaultProps, Toggle } from 'src/Toggle';
import * as Types from 'src/types';

import { colorProps, disableControl, hideProps } from '../__helpers__';

type Story = StoryObj<typeof Toggle>;

export default {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    ...defaultProps,
    label: 'Toggle',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    label: { control: 'text' },
  },
} satisfies Meta<typeof Toggle>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    size: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Toggle key={size} {...props} defaultChecked label={size} size={size} />
      ))}
    </Grid>
  ),
};

export const Variants: Story = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    variant: disableControl(),
  },
  render: props => {
    const { variants } = getTheme({ theme: useTheme() });

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
