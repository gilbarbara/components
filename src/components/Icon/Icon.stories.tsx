import { Meta, StoryObj } from '@storybook/react';

import { Button, Spacer } from '~';

import { colorProps, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, Icon } from './Icon';

type Story = StoryObj<typeof Icon>;

export default {
  title: 'Media/Icon',
  component: Icon,
  args: {
    ...defaultProps,
    name: 'send-alt',
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
