import { Meta, StoryObj } from '@storybook/react';

import { ButtonUnstyled, defaultProps } from 'src/components/ButtonUnstyled';

import { Icon } from '../../src';
import {
  colorProps,
  flexContent,
  flexItems,
  hideProps,
  layoutProps,
  spacingProps,
  textOptionsProps,
} from '../__helpers__';

type Story = StoryObj<typeof ButtonUnstyled>;

export default {
  title: 'Components/ButtonUnstyled',
  component: ButtonUnstyled,
  args: {
    ...defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...layoutProps(),
    ...spacingProps(),
    ...textOptionsProps(),
    align: { control: 'select', options: ['', ...flexItems] },
    justify: { control: 'select', options: ['', ...flexContent] },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `A button without styling`,
      },
    },
  },
} satisfies Meta<typeof ButtonUnstyled>;

export const Basic: Story = {};

export const Custom: Story = {
  args: {
    border: { size: 4, shade: 'mid', variant: 'primary' },
    children: <Icon name="flash" size={48} />,
    height: 64,
    justify: 'center',
    radius: 'round',
    variant: 'primary',
    width: 64,
  },
  argTypes: {
    children: { control: 'none' },
  },
};
