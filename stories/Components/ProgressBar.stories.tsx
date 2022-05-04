import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { ProgressBar } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    ...hideProps(),
    large: { defaultValue: false },
    step: { defaultValue: 1 },
    steps: { defaultValue: 4 },
    showProgression: { defaultValue: true },
    width: { control: 'text', defaultValue: '400px' },
  },
} as ComponentMeta<typeof ProgressBar>;

export function Basic(props: any) {
  return <ProgressBar {...props} />;
}
