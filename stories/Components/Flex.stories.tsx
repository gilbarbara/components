import * as React from 'react';

import { Flex, FlexCenter } from '../../src';
import { flexContent, flexItems, hideProps } from '../__helpers__';

export default {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    ...hideProps('textAlign'),
    alignContent: {
      control: 'select',
      name: 'Align Content',
      options: ['', ...flexContent],
      defaultValue: 'center',
    },
    alignItems: {
      control: 'select',
      name: 'Align Items',
      options: ['', ...flexItems],
      defaultValue: 'stretch',
    },
    flexDirection: {
      control: 'select',
      name: 'Flex Direction',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      defaultValue: 'row',
    },
    flexWrap: {
      control: 'select',
      name: 'Flex Wrap',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      defaultValue: 'wrap',
    },
    justifyContent: {
      control: 'select',
      name: 'Justify Content',
      options: ['', ...flexContent],
      defaultValue: 'flex-start',
    },
    margin: { control: 'select' },
    padding: { control: 'select' },
    radius: { control: 'select' },
    shade: { table: { disable: true } },
    shadow: { control: 'select', defaultValue: 'high' },
    variant: { table: { disable: true }, defaultValue: 'white' },
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
