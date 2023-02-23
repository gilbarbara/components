import { Meta, StoryObj } from '@storybook/react';

import { Button, Spacer } from 'src';
import { Icon } from 'src/Icon';

import { colorProps, hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof Icon>;

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    ...Icon.defaultProps,
    // @ts-expect-error
    name: 'check',
    size: 24,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    name: { control: 'select' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export const Basic: Story = {};

export const IconWithButton: Story = {
  args: {
    size: 18,
  },
  render: props => (
    <Button>
      <Icon {...props} mr="xs" />
      Send
    </Button>
  ),
};

export const IconWithText: Story = {
  args: {
    size: 18,
  },
  render: props => (
    <Spacer gap="xxs">
      <Icon {...props} />
      Send
    </Spacer>
  ),
};
