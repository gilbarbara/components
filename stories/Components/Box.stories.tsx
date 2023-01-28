import { H3, Icon, Paragraph, Text } from 'src';
import { Box, BoxCenter, BoxInline, BoxProps } from 'src/Box';

import {
  colorProps,
  disableControl,
  flexBoxProps,
  flexItemProps,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Box',
  component: Box,
  args: {
    ...Box.defaultProps,
    shadow: 'high',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexBoxProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...spacingProps(),
  },
};

export const Basic = {
  args: {
    padding: 'xl',
    radius: 'lg',
    shade: 'mid',
    variant: 'primary',
    width: '400',
  },
  render: (props: BoxProps) => (
    <Box {...props}>
      <H3 mb="lg">Hello, I'm the Box!</H3>
      <Paragraph>
        I'm the base component with support for layout, positioning, color, spacing, etc.
      </Paragraph>
      <Paragraph>
        You can use me to create more complex components, like the NonIdealState.
      </Paragraph>
    </Box>
  ),
};

export const Composed = {
  name: 'Flex (Composed)',
  args: {
    align: 'center',
    direction: 'row',
    flexBox: true,
    justify: 'flex-start',
    shadow: 'high',
    variant: 'white',
    wrap: 'wrap',
  },

  argTypes: {
    children: disableControl(),
  },
  render: (props: BoxProps) => (
    <Box {...props} minHeight={300} padding="xl" width={480}>
      <BoxCenter padding="lg" variant="blue" width="40%">
        Box 40%
      </BoxCenter>
      <BoxCenter padding="lg" variant="green" width="60%">
        Box 60%
      </BoxCenter>
      <BoxCenter padding="lg" variant="orange" width="30%">
        Box 30%
      </BoxCenter>
      <BoxCenter padding="lg" variant="yellow" width="70%">
        Box 70%
      </BoxCenter>
    </Box>
  ),
};

export const Center = {
  name: 'BoxCenter',
  args: {
    ...BoxCenter.defaultProps,
    children: 'This is a centered Box',
  },
  argTypes: {
    children: { control: 'text' },
  },
  render: (props: BoxProps) => <BoxCenter minHeight={400} width={400} {...props} />,
};

export const Inline = {
  name: 'BoxInline',
  args: BoxInline.defaultProps,
  argTypes: {
    children: disableControl(),
  },
  render: (props: BoxProps) => (
    <BoxInline width={400} {...props}>
      <Icon mr="xs" name="stories" />
      <Text>This is a inline Box</Text>
    </BoxInline>
  ),
};
