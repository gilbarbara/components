import { ComponentMeta } from '@storybook/react';
import { Divider, DividerProps } from 'src/Divider';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Divider',
  component: Divider,
  args: {
    borderStyle: 'solid',
    dimension: 'sm',
    direction: 'horizontal',
    gap: 'xs',
    shade: 'light',
    size: 'mid',
    variant: 'gray',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    children: { control: 'text' },
    length: { control: 'text' },
  },
} as ComponentMeta<typeof Divider>;

export const Basic = (props: DividerProps) => <Divider {...props} />;

export const Vertical = (props: DividerProps) => <Divider {...props} />;

Vertical.args = {
  direction: 'vertical',
  length: 100,
};

export const WithText = (props: DividerProps) => <Divider {...props} />;

WithText.args = {
  children: 'or',
};
