import { Meta } from '@storybook/react';

import { Button, Spacer } from 'src';
import { Icon, IconProps } from 'src/Icon';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    ...Icon.defaultProps,
    name: 'check-o',
    size: 24,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    name: { control: 'select' },
    title: { control: 'text' },
  },
} as Meta<typeof Icon>;

export const Basic = {};

export const IconWithButton = {
  args: {
    size: 18,
  },
  render: (props: IconProps) => (
    <Button>
      <Icon {...props} mr="xs" />
      Send
    </Button>
  ),
};

export const IconWithText = {
  args: {
    size: 18,
  },
  render: (props: IconProps) => (
    <Spacer gap="xxs">
      <Icon {...props} />
      Send
    </Spacer>
  ),
};
