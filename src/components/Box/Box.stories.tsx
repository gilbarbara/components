import { Meta, StoryObj } from '@storybook/react';

import { H3, Paragraph } from '~';

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

import { Box, defaultProps } from './Box';

type Story = StoryObj<typeof Box>;

export default {
  title: 'Components/Box',
  // category: 'Layout',
  component: Box,
  args: {
    ...defaultProps,
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
    width: 400,
  },
  argTypes: {
    children: disableControl(),
  },
};
