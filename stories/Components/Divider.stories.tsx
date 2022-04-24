import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Divider } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    ...hideProps(),
    size: { defaultValue: 'md' },
    type: { defaultValue: 'solid' },
  },
} as ComponentMeta<typeof Divider>;

export const Basic = (props: any) => {
  return <Divider {...props} />;
};
