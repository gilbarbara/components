import { Meta, StoryObj } from '@storybook/react';

import { H1, Icon, Spacer } from '~';

import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  spacingProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { Anchor, defaultProps } from './Anchor';

type Story = StoryObj<typeof Anchor>;

export default {
  title: 'Navigation/Anchor',
  component: Anchor,
  args: {
    ...defaultProps,
    children: 'Open in GitHub',
    external: true,
    href: 'https://github.com/gilbarbara/components',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...spacingProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Anchor>;

export const Basic: Story = {};

export const WithIcons: Story = {
  argTypes: {
    endContent: disableControl(),
    startContent: disableControl(),
  },
  render: props => (
    <Spacer gap="sm">
      <Anchor {...props} startContent={<Icon name="github" />} />
      <Anchor {...props} endContent={<Icon name="external" size={24} />} />
    </Spacer>
  ),
};

export const WithH1: Story = {
  name: 'With an H1 parent',
  args: {
    children: 'Check our docs',
  },
  render: props => (
    <H1>
      <Anchor {...props} />
    </H1>
  ),
};
