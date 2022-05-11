import { ComponentMeta } from '@storybook/react';
import { Icon, IconProps } from 'src/Icon';

import { icons } from 'src/modules/options';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'check-o',
    size: 24,
    spin: false,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    name: { control: 'select', options: icons },
    title: { control: 'text' },
  },
} as ComponentMeta<typeof Icon>;

export const Basic = (props: IconProps) => {
  return <Icon {...props} />;
};
