import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, Jumbo, Paragraph } from '~';

import {
  colorProps,
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '~/stories/__helpers__';

import { Container, defaultProps } from './Container';

type Story = StoryObj<typeof Container>;

export default {
  title: 'Components/Container',
  // category: 'Layout',
  component: Container,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...spacingProps(),
    children: disableControl(),
    fullScreenOffset: { control: 'text' },
  },
  parameters: {
    minHeight: 400,
  },
} satisfies Meta<typeof Container>;

export const Basic: Story = {
  args: {
    verticalPadding: true,
  },
  render: props => (
    <Box>
      <Container {...props} style={{ border: '1px solid #ccc' }}>
        <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
        <Paragraph>
          I'm a wrapper that holds any type of component with a pre-defined horizontal padding and
          an optional vertical padding
        </Paragraph>
      </Container>

      <Paragraph align="center" color="gray" mt="xs" size="xs">
        *The border is just for visualization...
      </Paragraph>
    </Box>
  ),
};

export const WithParent: Story = {
  args: {
    fullScreen: true,
    justify: 'center',
  },
  render: props => (
    <>
      <Flex border minHeight={300}>
        <Container {...props}>
          <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
          <Paragraph>
            I'm a wrapper that holds any type of component with a pre-defined horizontal padding and
            an optional vertical padding
          </Paragraph>
        </Container>
      </Flex>
      <Paragraph color="gray" mt="xs" size="xs">
        *The border is just for visualization...
      </Paragraph>
    </>
  ),
};
