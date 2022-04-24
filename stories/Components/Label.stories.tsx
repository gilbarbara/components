import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Label } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    ...hideProps(),
    labelId: {
      control: 'text',
      name: 'Id',
    },
    labelInfo: { control: 'text', name: 'Info', defaultValue: '*' },
    inline: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Label>;

export function Basic(props: any) {
  return (
    <Label {...props}>Far far away, behind the word mountains there live the blind texts.</Label>
  );
}
