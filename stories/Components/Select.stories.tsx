import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Select } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    ...hideProps(),
    name: { control: 'text', defaultValue: 'name' },
    bigger: { defaultValue: false },
    borderless: { defaultValue: false },
    multiple: { control: 'boolean', defaultValue: false },
    size: { control: 'number', defaultValue: 1 },
    disabled: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Select>;

export function Basic(props: any) {
  return (
    <Select {...props}>
      <option value="">Select your gender...</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  );
}
