import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  layoutProps,
  marginProps,
  radiusProps,
} from '~/stories/__helpers__';

import { ListItem } from './Item';
import { defaultProps, List } from './List';

type Story = StoryObj<typeof List>;

export default {
  title: 'Display/List',
  component: List,
  args: {
    ...defaultProps,
    minWidth: 260,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['borderColor']),
    ...layoutProps({ display: 'flex' }),
    ...marginProps(),
    ...radiusProps(),
    children: disableControl(),
  },
} satisfies Meta<typeof List>;

export const Basic: Story = {
  render: props => (
    <List {...props}>
      <ListItem bg="primary">The first item</ListItem>
      <ListItem>The second item</ListItem>
      <ListItem>The third item</ListItem>
      <ListItem>The forth item</ListItem>
      <ListItem>The fifth item</ListItem>
    </List>
  ),
};

export const Horizontal: Story = {
  args: {
    borderColor: 'black',
    direction: 'horizontal',
    radius: 'xl',
    shadow: 'low',
  },
  argTypes: {
    direction: disableControl(),
  },
  render: props => (
    <List {...props}>
      <ListItem>Contrast: 4.1</ListItem>
      <ListItem>Luminance: 2</ListItem>
      <ListItem>Hue: 344</ListItem>
      <ListItem>Saturation: 100</ListItem>
      <ListItem>Lightness: 50</ListItem>
    </List>
  ),
};

export const WithComponents: Story = {
  args: {
    children: [
      <ListItem key="1">
        <H3 mb="xs">Users</H3>
        <Paragraph>The users inside this group</Paragraph>
      </ListItem>,
      <ListItem key="2">
        <Spacer>
          <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
          <Box>
            <H6 mb={0}>John Smith</H6>
            <Paragraph>Admin</Paragraph>
          </Box>
        </Spacer>
      </ListItem>,
    ],
    border: false,
    radius: false,
  },
};
