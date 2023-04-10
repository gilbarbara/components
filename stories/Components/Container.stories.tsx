import { Meta, StoryObj } from '@storybook/react';

import { Box, Jumbo, Paragraph, Text } from 'src';
import { Container, defaultProps } from 'src/Container';

import {
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

type Story = StoryObj<typeof Container>;

export default {
  title: 'Components/Container',
  component: Container,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...layoutProps(),
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
    <Container {...props} style={{ border: '1px solid #ccc' }}>
      <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
      <Paragraph>
        I'm a wrapper that holds any type of component with a pre-defined horizontal padding and an
        optional vertical padding
      </Paragraph>
      <Text size="small" variant="gray">
        *The border is just for visualization...
      </Text>
    </Container>
  ),
};

export const WithParent: Story = {
  args: {
    justify: 'center',
  },
  render: props => (
    <Box flexBox minHeight={300} shade="lightest" variant="primary">
      <Container {...props}>
        <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
        <Paragraph>
          I'm a wrapper that holds any type of component with a pre-defined horizontal padding and
          an optional vertical padding
        </Paragraph>
      </Container>
    </Box>
  ),
};
