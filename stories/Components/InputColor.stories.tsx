import { ComponentMeta } from '@storybook/react';
import { InputColor, InputColorProps } from 'src/InputColor';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputColor',
  component: InputColor,
  argTypes: {
    ...hideProps(),
    disabled: { control: 'boolean', defaultValue: false },
    height: { control: 'text' },
    name: { control: 'text', defaultValue: 'name' },
    readOnly: { control: 'boolean', defaultValue: false },
    width: { control: 'text' },
  },
} as ComponentMeta<typeof InputColor>;

export function Basic(props: InputColorProps) {
  return <InputColor {...props} />;
}
