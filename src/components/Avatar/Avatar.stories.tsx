import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Flex, FlexCenter, Grid, Icon, Paragraph } from '~';

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
  title: 'Components/Avatar',
  // category: 'Media',
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
        <FlexCenter key={d}>
          <Avatar
            key={d}
            {...props}
            borderColor={d}
            image={users[index].avatar}
            name={users[index].name}
          />
          <Paragraph mt="xs">{d}</Paragraph>
        </FlexCenter>
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
        <FlexCenter key={d}>
          <Avatar key={d} {...props} bg={d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </FlexCenter>
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
        <FlexCenter key={d}>
          <Avatar
            key={d}
            {...props}
            image={users[index].avatar}
            name={users[index].name}
            radius={d}
          />
          <Paragraph mt="xs">{d}</Paragraph>
        </FlexCenter>
      ))}
    </Grid>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Flex gap="xl" justify="center" maxWidth={600} wrap="wrap">
      {objectKeys(avatar).map((size, index) => (
        <FlexCenter key={size}>
          <Avatar
            key={size}
            {...props}
            image={users[index].avatar}
            name={users[index].name}
            size={size}
          />
          <Paragraph mt="xs">{size}</Paragraph>
        </FlexCenter>
      ))}
      <FlexCenter>
        <Avatar {...props} image={users[9].avatar} name={users[9].name} size={300} />
        <Paragraph mt="xs">Custom size</Paragraph>
      </FlexCenter>
      <FlexCenter>
        <Avatar {...props} fontSize={120} image={undefined} name={users[13].name} size={200} />
        <Paragraph mt="xs">Custom font size</Paragraph>
      </FlexCenter>
    </Flex>
  ),
};
