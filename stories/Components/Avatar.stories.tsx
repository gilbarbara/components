import { Meta, StoryObj } from '@storybook/react';

import { BoxCenter, Grid, Paragraph } from 'src';
import { Avatar } from 'src/Avatar';

import { colorProps, disableControl, flexItemProps, hideProps } from '../__helpers__';

type Story = StoryObj<typeof Avatar>;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    ...Avatar.defaultProps,
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
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {(['xs', 'sm', 'md', 'lg', 'xl', 'jumbo'] as const).map(d => (
        <BoxCenter key={d}>
          <Avatar key={d} {...props} size={d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Grid>
  ),
};

export const WithoutImage: Story = {
  args: {
    image: undefined,
  },
};
