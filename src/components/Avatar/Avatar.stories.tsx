import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { BoxCenter, Paragraph, Spacer } from '~';

import { avatar } from '~/modules/theme';

import { colorProps, disableControl, flexItemProps, hideProps } from '~/stories/__helpers__';

import { Avatar, defaultProps } from './Avatar';

type Story = StoryObj<typeof Avatar>;

export default {
  title: 'Media/Avatar',
  component: Avatar,
  args: {
    ...defaultProps,
    image: 'https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800',
    name: 'Test User',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
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
      {objectKeys(avatar).map(d => (
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
