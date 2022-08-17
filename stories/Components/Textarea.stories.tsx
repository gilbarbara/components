import { ComponentMeta } from '@storybook/react';

import { Textarea, TextareaProps } from 'src/Textarea';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    ...Textarea.defaultProps,
    name: 'description',
    placeholder: 'Tell us something about yourself...',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} as ComponentMeta<typeof Textarea>;

export const Basic = (props: TextareaProps) => <Textarea {...props} />;
