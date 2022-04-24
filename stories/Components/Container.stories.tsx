import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Container, Jumbo, Paragraph, Text } from '../../src';
import { hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    ...hideProps(),
    verticalSpacing: { defaultValue: false },
    centered: { defaultValue: false },
    fullScreen: { defaultValue: false },
    fullScreenOffset: { control: 'text' },
    verticalAlign: { control: 'select' },
    margin: hideTable(),
    padding: hideTable(),
    radius: hideTable(),
    shadow: hideTable(),
    variant: hideTable(),
    shade: hideTable(),
  },
} as ComponentMeta<typeof Container>;

export const Basic = (props: any) => {
  return (
    <Container {...props} style={{ border: '1px solid #ccc' }}>
      <Jumbo mb="lg">Hello, I'm the Container!</Jumbo>
      <Paragraph>I'm a wrapper that holds all other components in a route.</Paragraph>
      <Text size="small" variant="gray">
        *The border is just for visualization...
      </Text>
    </Container>
  );
};
