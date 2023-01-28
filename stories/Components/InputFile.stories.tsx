import { Meta } from '@storybook/react';

import { InputFile } from 'src/InputFile';

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
} as Meta<typeof InputFile>;

export const Basic = {};
