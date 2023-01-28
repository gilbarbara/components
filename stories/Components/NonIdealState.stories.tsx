import { Meta } from '@storybook/react';

import { NonIdealState } from 'src/NonIdealState';

import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/NonIdealState',
  component: NonIdealState,
  args: NonIdealState.defaultProps,
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
} as Meta<typeof NonIdealState>;

export const Basic = {};

export const Horizontal = {
  args: {
    direction: 'horizontal',
  },
  argTypes: {
    direction: disableControl(),
  },
};
