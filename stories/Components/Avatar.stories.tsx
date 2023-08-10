import { Meta, StoryObj } from '@storybook/react';

import { BoxCenter, Paragraph, Spacer } from 'src';
import { Avatar, defaultProps } from 'src/components/Avatar';
import { avatar } from 'src/modules/theme';

import { AvatarSize } from '../../src/types';
import { colorProps, disableControl, flexItemProps, hideProps } from '../__helpers__';

type Story = StoryObj<typeof Avatar>;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    ...defaultProps,
    image: 'https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800',
    name: 'Test User',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
  },
} satisfies Meta<typeof Avatar>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer gap="xl">
      {(Object.keys(avatar) as AvatarSize[]).map(d => (
        <BoxCenter key={d}>
          <Avatar key={d} {...props} size={d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Spacer>
  ),
};

export const WithoutImage: Story = {
  args: {
    image: undefined,
  },
};
