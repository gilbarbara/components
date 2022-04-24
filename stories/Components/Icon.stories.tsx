import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Icon } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    ...hideProps(),
    name: { defaultValue: 'check-o' },
    size: { defaultValue: 24 },
    spin: { defaultValue: false },
    title: { control: 'text' },
  },
} as ComponentMeta<typeof Icon>;

export const Basic = (props: any) => {
  const { title } = props;

  return <Icon key={title} {...props} />;
};
