import { ComponentMeta } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from 'src/ProgressBar';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    backgroundShade: 'light',
    large: false,
    hideText: false,
    shade: 'mid',
    step: 1,
    steps: 4,
    variant: 'primary',
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof ProgressBar>;

export function Basic(props: ProgressBarProps) {
  return <ProgressBar {...props} />;
}
