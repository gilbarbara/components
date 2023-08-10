import { Meta, StoryObj } from '@storybook/react';

import { Button, Spacer } from 'src';
import { defaultProps, Icon } from 'src/components/Icon';

import { colorProps, hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof Icon>;

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    ...defaultProps,
    name: 'send',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    name: { control: 'select' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export const Basic: Story = {
  args: {
    size: 32,
  },
};

export const IconWithButton: Story = {
  render: props => (
    <Button>
      <Icon {...props} mr="xs" />
      Send
    </Button>
  ),
};

export const IconWithText: Story = {
  render: props => (
    <Spacer gap="xxs">
      <Icon {...props} />
      Send
    </Spacer>
  ),
};
