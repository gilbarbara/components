import { ComponentMeta } from '@storybook/react';
import { InputFile, InputFileProps } from 'src/InputFile';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputFile',
  component: InputFile,
  args: {
    disabled: false,
    invert: true,
    large: false,
    name: 'file',
    readOnly: false,
    width: 480,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof InputFile>;

export function Basic(props: InputFileProps) {
  return <InputFile {...props} />;
}
