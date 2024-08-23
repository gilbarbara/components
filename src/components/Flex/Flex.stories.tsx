import { Meta, StoryObj } from '@storybook/react';

import { Icon, Text } from '~';

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
  Flex,
  FlexCenter,
  flexCenterDefaultProps,
  flexDefaultProps,
  FlexInline,
  flexInlineDefaultProps,
} from './Flex';

type Story = StoryObj<typeof Flex>;

export default {
  title: 'Components/Flex',
  // category: 'Layout',
  component: Flex,
  args: {
    ...flexDefaultProps,
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
} satisfies Meta<typeof Flex>;

export const Basic: Story = {
  args: {
    align: 'center',
    bg: 'white',
    direction: 'row',
    justify: 'flex-start',
    minHeight: 300,
    padding: 'xl',
    width: 480,
    wrap: 'wrap',
  },
  argTypes: {
    children: disableControl(),
  },
  render: props => (
    <Flex {...props}>
      <FlexCenter bg="blue" padding="lg" width="40%">
        Box 40%
      </FlexCenter>
      <FlexCenter bg="green" padding="lg" width="60%">
        Box 60%
      </FlexCenter>
      <FlexCenter bg="orange" padding="lg" width="30%">
        Box 30%
      </FlexCenter>
      <FlexCenter bg="yellow" padding="lg" width="70%">
        Box 70%
      </FlexCenter>
    </Flex>
  ),
};

export const Center: Story = {
  name: 'FlexCenter',
  args: {
    ...flexCenterDefaultProps,
    children: 'This is a centered Box',
  },
  render: props => <FlexCenter minHeight={400} width={400} {...props} />,
};

export const Inline: Story = {
  name: 'FlexInline',
  args: flexInlineDefaultProps,
  render: props => (
    <FlexInline width={400} {...props}>
      <Icon mr="xs" name="template" />
      <Text>This is a inline Box</Text>
    </FlexInline>
  ),
};
