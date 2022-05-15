import { ComponentMeta } from '@storybook/react';
import { H3, Paragraph } from 'src';
import { Box, BoxProps } from 'src/Box';

import {
  colorProps,
  disableControl,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Box',
  component: Box,
  args: {
    padding: 'xl',
    radius: 'lg',
    shade: 'mid',
    shadow: 'high',
    variant: 'primary',
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...spacingProps(),
    children: disableControl(),
  },
} as ComponentMeta<typeof Box>;

export const Basic = (props: BoxProps) => (
  <Box {...props}>
    <H3 mb="lg">Hello, I'm the Box!</H3>
    <Paragraph>
      I'm the base component with support for layout, positioning, color, spacing, etc.
    </Paragraph>
    <Paragraph>You can use me to create more complex components, like the NonIdealState.</Paragraph>
  </Box>
);
