import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Box, Button, Group, Input } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Group',
  component: Group,
  subcomponents: { Box },
  argTypes: {
    ...hideProps(),
    distribution: { control: 'select' },
    gap: { control: 'select', defaultValue: 'sm' },
    width: { control: 'number', defaultValue: 400 },
  },
} as ComponentMeta<typeof Group>;

export const Basic = (props: any) => {
  const { width, ...rest } = props;

  return (
    <Box padding="lg" radius="sm" shadow="high" variant="white" width={width}>
      <Group {...rest}>
        <Button size="sm">Yes, add it</Button>
        <Button invert size="sm">
          No, cancel
        </Button>
      </Group>
    </Box>
  );
};

export const WithInput = (props: any) => {
  const { width, ...rest } = props;

  return (
    <Box padding="lg" radius="sm" shadow="high" variant="white" width={width}>
      <Group {...rest}>
        <Input name="name" placeholder="Type your name" width={200} />
        <Button>Add</Button>
      </Group>
    </Box>
  );
};
