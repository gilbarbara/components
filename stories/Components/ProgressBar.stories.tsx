import { Meta } from '@storybook/react';

import { ProgressBar } from 'src/ProgressBar';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    ...ProgressBar.defaultProps,
    step: 1,
    steps: 4,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} as Meta<typeof ProgressBar>;

export const Basic = {};
