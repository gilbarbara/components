import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Box, H3, Paragraph } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    ...hideProps(),
    margin: { control: 'select' },
    padding: { control: 'select', defaultValue: 'xl' },
    radius: { control: 'select', defaultValue: 'lg' },
    shadow: { control: 'select', defaultValue: 'high' },
    variant: { control: 'select', defaultValue: 'primary' },
    shade: { control: 'select' },
    width: { control: 'number', defaultValue: 400 },
  },
} as ComponentMeta<typeof Box>;

export const Basic = (props: any) => {
  return (
    <Box {...props}>
      <H3 mb="lg">Hello, I'm the Box!</H3>
      <Paragraph>
        I'm a primitive component that supports margin, padding, radius, shadow, heigth and width.
      </Paragraph>
      <Paragraph>
        You can use me to create more complex components, like the NonIdealState.
      </Paragraph>
    </Box>
  );
};
