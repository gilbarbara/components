import { ComponentMeta } from '@storybook/react';

import { Box, Jumbo, Paragraph, Text } from 'src';
import { Container, ContainerProps } from 'src/Container';

import {
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Container',
  component: Container,
  args: Container.defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...spacingProps(),
    children: disableControl(),
    fullScreenOffset: { control: 'text' },
    verticalAlign: { control: 'select' },
  },
  parameters: {
    minHeight: 400,
  },
} as ComponentMeta<typeof Container>;

export const Basic = (props: ContainerProps) => (
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
);
Basic.args = {
  verticalPadding: true,
};

export const WithParent = (props: ContainerProps) => (
  <Box flexBox minHeight={300} shade="lightest" variant="primary">
    <Container {...props}>
      <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
      <Paragraph>
        I'm a wrapper that holds any type of component with a pre-defined horizontal padding and an
        optional vertical padding
      </Paragraph>
    </Container>
  </Box>
);
WithParent.args = {
  justify: 'center',
};
