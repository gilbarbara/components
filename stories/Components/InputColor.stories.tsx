import { ComponentMeta } from '@storybook/react';
import { InputColor, InputColorProps } from 'src/InputColor';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputColor',
  component: InputColor,
  args: {
    disabled: false,
    name: 'color',
    readOnly: false,
  },
  argTypes: {
    ...hideProps(),
    height: { control: 'text' },
    width: { control: 'text' },
  },
} as ComponentMeta<typeof InputColor>;

export const Basic = (props: InputColorProps) => <InputColor {...props} />;
