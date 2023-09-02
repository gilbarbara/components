import { Meta, StoryObj } from '@storybook/react';

import { Icon } from '~';

import {
  colorProps,
  flexContent,
  flexItems,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { ButtonUnstyled, defaultProps } from './ButtonUnstyled';

type Story = StoryObj<typeof ButtonUnstyled>;

export default {
  title: 'Buttons/ButtonUnstyled',
  component: ButtonUnstyled,
  args: {
    ...defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...layoutProps(),
    ...radiusProps(),
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
    border: { size: 4, color: 'primary' },
    children: <Icon name="flash" size={48} />,
    color: 'primary',
    height: 64,
    justify: 'center',
    radius: 'round',
    width: 64,
  },
  argTypes: {
    children: { control: 'none' },
  },
};
