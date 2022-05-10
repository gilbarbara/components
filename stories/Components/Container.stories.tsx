import { ComponentMeta } from '@storybook/react';
import { Jumbo, Paragraph, Text } from 'src';
import { Container, ContainerProps } from 'src/Container';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Container',
  component: Container,
  args: {
    centered: false,
    fullScreen: false,
    verticalSpacing: false,
  },
  argTypes: {
    ...hideProps(),
    fullScreenOffset: { control: 'text' },
    verticalAlign: { control: 'select' },
  },
  parameters: {
    minHeight: 400,
  },
} as ComponentMeta<typeof Container>;

export const Basic = (props: ContainerProps) => {
  return (
    <Container {...props} style={{ border: '1px solid #ccc' }}>
      <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
      <Paragraph>I'm a wrapper that holds all other components.</Paragraph>
      <Text size="small" variant="gray">
        *The border is just for visualization...
      </Text>
    </Container>
  );
};
