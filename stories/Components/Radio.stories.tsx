import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Radio } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    ...hideProps(),
    label: { control: 'text', defaultValue: 'Skip Packaging' },
    name: { defaultValue: 'check' },
    onChange: {
      action: 'onChange',
      table: { disable: true },
    },
    checked: {
      table: { disable: true },
    },
  },
} as ComponentMeta<typeof Radio>;

export const Basic = (props: any) => {
  return <Radio {...props} />;
};
