import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Textarea } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    ...hideProps(),
    borderless: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    endSpacing: { defaultValue: false },
    name: { control: 'text', defaultValue: 'name' },
    placeholder: { control: 'text', defaultValue: 'Tell us something about yourself...' },
    readOnly: { control: 'boolean', defaultValue: false },
    rows: { control: 'number', defaultValue: 3 },
    startSpacing: { defaultValue: false },
    width: { control: 'text', defaultValue: '100%' },
  },
} as ComponentMeta<typeof Textarea>;

export function Basic(props: any) {
  return <Textarea {...props} />;
}
