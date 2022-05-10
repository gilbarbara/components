import { ComponentMeta } from '@storybook/react';
import { Icon } from 'src';
import { Tooltip, TooltipProps } from 'src/Tooltip';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    align: 'middle',
    bold: false,
    content: 'Long and complete with additional information and some other data',
    maxWidth: 320,
    position: 'right',
    shade: 'dark',
    size: 'mid',
    variant: 'gray',
  },
  argTypes: {
    ...hideProps(),
    content: { control: 'text' },
    size: { control: 'select' },
  },
} as ComponentMeta<typeof Tooltip>;

export function Basic(props: TooltipProps) {
  const icon = <Icon name="info" size={24} title={null} />;

  return <Tooltip {...props}>{icon}</Tooltip>;
}
