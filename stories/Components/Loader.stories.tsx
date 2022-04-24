import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Loader } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    ...hideProps(),
    size: { defaultValue: 128 },
    type: { defaultValue: 'pill' },
    variant: { control: 'select' },
    shade: { control: 'select' },
  },
} as ComponentMeta<typeof Loader>;

export const Basic = (props: any) => {
  return <Loader {...props} />;
};
