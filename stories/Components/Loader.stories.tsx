import { ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof Loader>;

export const Pill = (props: any) => <Loader {...props} />;
Pill.args = {
  type: 'pill',
};

export const Grow = (props: any) => <Loader {...props} />;
Grow.args = {
  type: 'grow',
};

export const Pride = (props: any) => <Loader {...props} />;
Pride.args = {
  type: 'pride',
};
Pride.argTypes = {
  color: hideTable(),
  shade: hideTable(),
  variant: hideTable(),
};

export const Pulse = (props: any) => <Loader {...props} />;
Pulse.args = {
  type: 'pulse',
};

export const Rotate = (props: any) => <Loader {...props} />;
Rotate.args = {
  type: 'rotate',
};
