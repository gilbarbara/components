import { Meta, StoryObj } from '@storybook/react';

import { H1 } from 'src';
import { Anchor, defaultProps } from 'src/Anchor';

import { colorProps, hideProps, spacingProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof Anchor>;

export default {
  title: 'Components/Anchor',
  component: Anchor,
  args: {
    ...defaultProps,
    children: 'Open in GitHub',
    external: true,
    href: 'https://github.com/gilbarbara/components',
    iconBefore: 'github',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
    display: { control: 'text' },
  },
} satisfies Meta<typeof Anchor>;

export const Basic: Story = {};

export const WithH1: Story = {
  name: 'With an H1 parent',
  args: {
    children: 'Check our docs',
    iconBefore: undefined,
  },
  render: props => (
    <H1>
      <Anchor {...props} />
    </H1>
  ),
};
