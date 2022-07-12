import { H3, Icon, Paragraph, Text } from 'src';
import { Box, BoxCenter, BoxInline, BoxProps } from 'src/Box';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItemProps,
  flexItems,
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
    ...flexItemProps(),
    ...layoutProps(),
    ...positioningProps(),
    ...spacingProps(),
    alignContent: { control: 'select', options: ['', ...flexContent] },
    align: { control: 'select', options: ['', ...flexItems] },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    justify: { control: 'select', options: ['', ...flexContent] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
  },
};

export const Basic = (props: BoxProps) => (
  <Box {...props}>
    <H3 mb="lg">Hello, I'm the Box!</H3>
    <Paragraph>
      I'm the base component with support for layout, positioning, color, spacing, etc.
    </Paragraph>
    <Paragraph>You can use me to create more complex components, like the NonIdealState.</Paragraph>
  </Box>
);
Basic.args = {
  padding: 'xl',
  radius: 'lg',
  shade: 'mid',
  variant: 'primary',
  width: '400',
};

export const Composed = (props: BoxProps) => (
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
);
Composed.args = {
  align: 'center',
  direction: 'row',
  flexBox: true,
  justify: 'flex-start',
  shadow: 'high',
  variant: 'white',
  wrap: 'wrap',
};
Composed.argTypes = {
  children: disableControl(),
};
Composed.storyName = 'Flex (Composed)';

export const Center = (props: BoxProps) => <BoxCenter minHeight={400} width={400} {...props} />;
Center.args = {
  ...BoxCenter.defaultProps,
  children: 'This is a centered Box',
};
Center.argTypes = {
  children: { control: 'text' },
};
Center.storyName = 'BoxCenter';

export const Inline = (props: BoxProps) => (
  <BoxInline width={400} {...props}>
    <Icon mr="xs" name="stories" />
    <Text>This is a inline Box</Text>
  </BoxInline>
);
Inline.args = BoxInline.defaultProps;
Inline.argTypes = {
  children: disableControl(),
};
Inline.storyName = 'BoxInline';
