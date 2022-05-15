import { ComponentMeta } from '@storybook/react';
import { Icon, IconProps } from 'src/Icon';

import { icons } from 'src/modules/options';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'check-o',
    shade: 'mid',
    size: 24,
    spin: false,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    name: { control: 'select', options: icons },
    title: { control: 'text' },
  },
} as ComponentMeta<typeof Icon>;

export const Basic = (props: IconProps) => <Icon {...props} />;
