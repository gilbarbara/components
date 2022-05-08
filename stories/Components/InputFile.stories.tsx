import { ComponentMeta } from '@storybook/react';
import { InputFile, InputFileProps } from 'src/InputFile';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputFile',
  component: InputFile,
  argTypes: {
    ...hideProps(),
    disabled: { control: 'boolean', defaultValue: false },
    name: { control: 'text', defaultValue: 'name' },
    readOnly: { control: 'boolean', defaultValue: false },
    width: { control: 'text' },
  },
} as ComponentMeta<typeof InputFile>;

export function Basic(props: InputFileProps) {
  return <InputFile {...props} />;
}
