import { ComponentMeta } from '@storybook/react';

import { InputFile, InputFileProps } from 'src/InputFile';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputFile',
  component: InputFile,
  args: {
    ...InputFile.defaultProps,
    name: 'file',
    width: 480,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof InputFile>;

export const Basic = (props: InputFileProps) => <InputFile {...props} />;
