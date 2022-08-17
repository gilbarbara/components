import { ComponentMeta } from '@storybook/react';

import { ProgressBar, ProgressBarProps } from 'src/ProgressBar';

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
} as ComponentMeta<typeof ProgressBar>;

export const Basic = (props: ProgressBarProps) => <ProgressBar {...props} />;
