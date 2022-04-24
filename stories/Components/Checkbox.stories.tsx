import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Checkbox } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>;

export const Basic = (props: any) => {
  return <Checkbox {...props} />;
};
