import { Meta } from '@storybook/react';

import { Loader } from 'src/Loader';

import { colorProps, hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Loader',
  component: Loader,
  args: {
    ...Loader.defaultProps,
    size: 128,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
  },
} as Meta<typeof Loader>;

export const Pill = {
  args: {
    type: 'pill',
  },
};

export const Grow = {
  args: {
    type: 'grow',
  },
};

export const Pride = {
  args: {
    type: 'pride',
  },
  argTypes: {
    color: hideTable(),
    shade: hideTable(),
    variant: hideTable(),
  },
};

export const Pulse = {
  args: {
    type: 'pulse',
  },
};

export const Rotate = {
  args: {
    type: 'rotate',
  },
};
