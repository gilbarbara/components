import { ComponentMeta } from '@storybook/react';
import { H3, Paragraph } from 'src';
import { Box, BoxProps } from 'src/Box';

import { colorProps, hideProps, layoutProps, positioningProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/Box',
  component: Box,
  args: {
    padding: 'xl',
    radius: 'lg',
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
  },
} as ComponentMeta<typeof Box>;

export const Basic = (props: BoxProps) => {
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
