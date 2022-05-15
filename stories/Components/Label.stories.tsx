import { ComponentMeta } from '@storybook/react';
import { Label, LabelProps } from 'src/Label';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Label',
  component: Label,
  args: {
    inline: false,
    labelInfo: '*',
  },
  argTypes: {
    ...hideProps(),
    labelInfo: { control: 'text' },
  },
} as ComponentMeta<typeof Label>;

export const Basic = (props: LabelProps) => (
  <Label {...props}>Far far away, behind the word mountains there live the blind texts.</Label>
);
