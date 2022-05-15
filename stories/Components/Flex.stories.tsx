import { Icon, Text } from 'src';
import { Flex, FlexCenter, FlexInline, FlexProps } from 'src/Flex';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItems,
  hideProps,
  layoutProps,
  positioningProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Flex',
  component: Flex,
  args: {
    alignContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    shadow: 'high',
    variant: 'white',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...layoutProps({ display: 'flex' }),
    ...positioningProps(),
    ...spacingProps(),
    alignContent: { control: 'select', options: ['', ...flexContent] },
    alignItems: { control: 'select', options: ['', ...flexItems] },
    flex: { control: 'text' },
    flexBasis: { control: 'text' },
    flexDirection: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    flexGrow: { control: 'text' },
    flexShrink: { control: 'text' },
    flexWrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    justifyContent: { control: 'select', options: ['', ...flexContent] },
    order: { control: 'text' },
  },
};

export const Basic = (props: FlexProps) => (
  <Flex alignItems="" {...props} minHeight={300} width={400}>
    <FlexCenter padding="lg" variant="blue" width="40%">
      Box 40%
    </FlexCenter>
    <FlexCenter padding="lg" variant="green" width="60%">
      Box 60%
    </FlexCenter>
    <FlexCenter padding="lg" variant="orange" width="30%">
      Box 30%
    </FlexCenter>
    <FlexCenter padding="lg" variant="yellow" width="70%">
      Box 70%
    </FlexCenter>
  </Flex>
);

Basic.argTypes = {
  children: disableControl(),
};

export const Center = (props: FlexProps) => <FlexCenter minHeight={400} width={400} {...props} />;

Center.args = {
  alignItems: 'center',
  children: 'This is a centered Flex',
  justifyContent: 'center',
};
Center.argTypes = {
  children: { control: 'text' },
};

export const Inline = (props: FlexProps) => (
  <FlexInline alignItems="center" width={400} {...props}>
    <Icon mr="xs" name="stories" />
    <Text>This is a inline Flex</Text>
  </FlexInline>
);

Inline.args = {
  alignItems: 'center',
  display: 'inline-flex',
};
Inline.argTypes = {
  children: disableControl(),
};
