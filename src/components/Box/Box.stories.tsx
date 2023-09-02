import { Meta, StoryObj } from '@storybook/react';

import { H3, Icon, Paragraph, Text } from '~';

import {
  colorProps,
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  layoutProps,
  positioningProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import {
  Box,
  BoxCenter,
  boxCenterDefaultProps,
  boxDefaultProps,
  BoxInline,
  boxInlineDefaultProps,
} from './Box';

type Story = StoryObj<typeof Box>;

export default {
  title: 'Layout/Box',
  component: Box,
  args: {
    ...boxDefaultProps,
    shadow: 'high',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...radiusProps(),
    ...spacingProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Box>;

export const Basic: Story = {
  args: {
    bg: 'primary',
    children: (
      <>
        <H3 mb="lg">Hello, I'm the Box!</H3>
        <Paragraph>
          I'm the base component with support for layout, positioning, color, spacing, etc.
        </Paragraph>
        <Paragraph>
          You can use me to create more complex components, like the NonIdealState.
        </Paragraph>
      </>
    ),
    padding: 'xl',
    radius: 'lg',
    width: '400',
  },
  argTypes: {
    children: disableControl(),
  },
};

export const Composed: Story = {
  name: 'Flex (Composed)',
  args: {
    align: 'center',
    bg: 'white',
    children: (
      <>
        <BoxCenter bg="blue" padding="lg" width="40%">
          Box 40%
        </BoxCenter>
        <BoxCenter bg="green" padding="lg" width="60%">
          Box 60%
        </BoxCenter>
        <BoxCenter bg="orange" padding="lg" width="30%">
          Box 30%
        </BoxCenter>
        <BoxCenter bg="yellow" padding="lg" width="70%">
          Box 70%
        </BoxCenter>
      </>
    ),
    direction: 'row',
    flexBox: true,
    justify: 'flex-start',
    minHeight: 300,
    padding: 'xl',
    shadow: 'high',
    width: 480,
    wrap: 'wrap',
  },
  argTypes: {
    children: disableControl(),
  },
};

export const Center: Story = {
  name: 'BoxCenter',
  args: {
    ...boxCenterDefaultProps,
    children: 'This is a centered Box',
  },
  render: props => <BoxCenter minHeight={400} width={400} {...props} />,
};

export const Inline: Story = {
  name: 'BoxInline',
  args: boxInlineDefaultProps,
  render: props => (
    <BoxInline width={400} {...props}>
      <Icon mr="xs" name="template" />
      <Text>This is a inline Box</Text>
    </BoxInline>
  ),
};
