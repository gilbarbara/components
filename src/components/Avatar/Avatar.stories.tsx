import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { BoxCenter, Grid, Icon, Paragraph, Spacer } from '~';

import { avatar, radius } from '~/modules/theme';

import users from '~/stories/__fixtures__/users.json';
import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  radiusProps,
  VARIANTS,
} from '~/stories/__helpers__';

import { Avatar, defaultProps } from './Avatar';

type Story = StoryObj<typeof Avatar>;

export default {
  title: 'Media/Avatar',
  component: Avatar,
  args: {
    ...defaultProps,
    image: users[0].avatar,
    name: users[0].name,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'borderColor', 'color']),
    ...flexItemProps(),
    ...radiusProps(),
  },
} satisfies Meta<typeof Avatar>;

export const Basic: Story = {};

export const WithoutImage: Story = {
  args: {
    image: undefined,
  },
};

export const WithoutName: Story = {
  args: {
    image: undefined,
    name: undefined,
  },
};

export const WithFallback: Story = {
  args: {
    fallback: <Icon name="star" size={32} />,
    image: undefined,
    name: undefined,
  },
};

export const BorderColors: Story = {
  args: {
    bordered: true,
  },
  argTypes: {
    borderColor: disableControl(),
    image: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      {VARIANTS.map((d, index) => (
        <BoxCenter key={d}>
          <Avatar
            key={d}
            {...props}
            borderColor={d}
            image={users[index].avatar}
            name={users[index].name}
          />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Grid>
  ),
};

export const Colors: Story = {
  name: 'Colors (bg)',
  args: {
    image: undefined,
  },
  argTypes: {
    bg: disableControl(),
    size: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      {VARIANTS.map(d => (
        <BoxCenter key={d}>
          <Avatar key={d} {...props} bg={d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Grid>
  ),
};

export const Radius: Story = {
  args: {
    size: 'xl',
  },
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      {objectKeys(radius).map((d, index) => (
        <BoxCenter key={d}>
          <Avatar
            key={d}
            {...props}
            image={users[index].avatar}
            name={users[index].name}
            radius={d}
          />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Grid>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer gap="xl">
      {objectKeys(avatar).map((d, index) => (
        <BoxCenter key={d}>
          <Avatar
            key={d}
            {...props}
            image={users[index].avatar}
            name={users[index].name}
            size={d}
          />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Spacer>
  ),
};
