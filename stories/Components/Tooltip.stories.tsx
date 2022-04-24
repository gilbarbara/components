import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Icon, Tooltip } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    ...hideProps('children'),
    content: {
      control: 'text',
      defaultValue: 'Long and complete with additional information and some other data',
    },
    position: { defaultValue: 'right' },
    align: { defaultValue: 'middle' },
    variant: { defaultValue: 'gray' },
    shade: { defaultValue: 'dark' },
    size: { defaultValue: 'mid' },
  },
} as ComponentMeta<typeof Tooltip>;

export function Basic(props: any) {
  const icon = <Icon name="info" size={24} title={null} />;

  return <Tooltip {...props}>{icon}</Tooltip>;
}
