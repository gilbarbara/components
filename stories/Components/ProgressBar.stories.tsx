import { ComponentMeta } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from 'src/ProgressBar';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    large: false,
    showProgression: true,
    step: 1,
    steps: 4,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof ProgressBar>;

export function Basic(props: ProgressBarProps) {
  return <ProgressBar {...props} />;
}
