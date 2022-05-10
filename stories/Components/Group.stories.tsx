import { ComponentMeta } from '@storybook/react';
import { Button, Input } from 'src';
import { Group, GroupProps } from 'src/Group';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Group',
  component: Group,
  args: {
    gap: 'sm',
    width: 400,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Group>;

export const Basic = (props: GroupProps) => {
  return (
    <Group {...props}>
      <Button size="sm">Yes, add it</Button>
      <Button invert size="sm">
        No, cancel
      </Button>
    </Group>
  );
};

export const WithInput = (props: GroupProps) => {
  return (
    <Group {...props}>
      <Input name="name" placeholder="Type your name" width={200} />
      <Button>Add</Button>
    </Group>
  );
};
