import { ComponentMeta } from '@storybook/react';
import { Textarea, TextareaProps } from 'src/Textarea';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    borderless: false,
    disabled: false,
    endSpacing: false,
    name: 'description',
    placeholder: 'Tell us something about yourself...',
    readOnly: false,
    rows: 3,
    startSpacing: false,
    width: '100%',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} as ComponentMeta<typeof Textarea>;

export function Basic(props: TextareaProps) {
  return <Textarea {...props} />;
}
