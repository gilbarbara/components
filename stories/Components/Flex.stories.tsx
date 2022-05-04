import * as React from 'react';

import { Flex, FlexCenter, FlexInline, Icon, Text } from '../../src';
import { flexContent, flexItems, hideProps, layoutParameters } from '../__helpers__';

export default {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    ...hideProps('textAlign'),
    ...layoutParameters({ display: 'flex' }),
    alignContent: {
      control: 'select',
      options: ['', ...flexContent],
      defaultValue: 'center',
    },
    alignItems: {
      control: 'select',
      options: ['', ...flexItems],
      defaultValue: 'stretch',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      defaultValue: 'row',
    },
    flexWrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      defaultValue: 'wrap',
    },
    justifyContent: {
      control: 'select',
      options: ['', ...flexContent],
      defaultValue: 'flex-start',
    },
    shadow: { control: 'select', defaultValue: 'high' },
    variant: { defaultValue: 'white' },
  },
};

export const Basic = (props: any) => (
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

export const Center = (props: any) => (
  <FlexCenter minHeight={400} width={400} {...props}>
    This is a centered Flex
  </FlexCenter>
);

export const Inline = (props: any) => (
  <FlexInline alignItems="center" width={400} {...props}>
    <Icon mr="xs" name="stories" />
    <Text>This is a inline Flex</Text>
  </FlexInline>
);

Inline.argTypes = {
  alignItems: { defaultValue: 'center' },
  display: { defaultValue: 'inline-flex' },
};
