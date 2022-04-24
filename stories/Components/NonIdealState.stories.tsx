import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { NonIdealState } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/NonIdealState',
  component: NonIdealState,
  argTypes: {
    ...hideProps('textAlign'),
    children: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    type: { control: 'select', defaultValue: 'error' },
    small: { defaultValue: false },
  },
} as ComponentMeta<typeof NonIdealState>;

export const Basic = (props: any) => {
  return <NonIdealState {...props} />;
};
