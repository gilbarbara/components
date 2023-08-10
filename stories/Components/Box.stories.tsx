import { Meta, StoryObj } from '@storybook/react';

import { H3, Icon, Paragraph, Text } from 'src';
import {
  Box,
  BoxCenter,
  boxCenterDefaultProps,
  boxDefaultProps,
  BoxInline,
  boxInlineDefaultProps,
} from 'src/components/Box';

import {
  colorProps,
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '../__helpers__';

type Story = StoryObj<typeof Box>;

export default {
  title: 'Components/Box',
  component: Box,
  args: {
    ...boxDefaultProps,
    shadow: 'high',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...spacingProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Box>;

export const Basic: Story = {
  args: {
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
    shade: 'mid',
    variant: 'primary',
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
    children: (
      <>
        <BoxCenter padding="lg" variant="blue" width="40%">
          Box 40%
        </BoxCenter>
        <BoxCenter padding="lg" variant="green" width="60%">
          Box 60%
        </BoxCenter>
        <BoxCenter padding="lg" variant="orange" width="30%">
          Box 30%
        </BoxCenter>
        <BoxCenter padding="lg" variant="yellow" width="70%">
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
    variant: 'white',
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
