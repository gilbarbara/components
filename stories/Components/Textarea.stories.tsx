import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Textarea } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    ...hideProps(),
    name: { control: 'text', defaultValue: 'name' },
    placeholder: { control: 'text', defaultValue: 'Your name here...' },
    borderless: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    readOnly: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Textarea>;

export function Basic(props: any) {
  return <Textarea {...props} />;
}
