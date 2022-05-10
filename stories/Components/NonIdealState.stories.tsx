import { ComponentMeta } from '@storybook/react';
import { NonIdealState, NonIdealStateProps } from 'src/NonIdealState';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/NonIdealState',
  component: NonIdealState,
  args: {
    small: false,
    type: 'error',
  },
  argTypes: {
    ...hideProps(),
    children: { control: 'text' },
    description: { control: 'text' },
    title: { control: 'text' },
    type: { control: 'select' },
  },
} as ComponentMeta<typeof NonIdealState>;

export const Basic = (props: NonIdealStateProps) => {
  return <NonIdealState {...props} />;
};
