import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, NonIdealState } from 'src/NonIdealState';

import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

type Story = StoryObj<typeof NonIdealState>;

export default {
  title: 'Components/NonIdealState',
  component: NonIdealState,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...spacingProps(),
    children: { control: 'text' },
    description: { control: 'text' },
    title: { control: 'text' },
    type: { control: 'select' },
  },
} satisfies Meta<typeof NonIdealState>;

export const Basic: Story = {};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  argTypes: {
    direction: disableControl(),
  },
};
