import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, H3, H6, ListProps, Paragraph, Spacer } from '~';

import { sizes } from '~/modules/options';
import {
  addChromaticModes,
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
  title: 'Components/List',
  // category: 'Display',
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
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof List>;

function Component(props: ListProps) {
  return (
    <List {...props}>
      <ListItem bg="primary" hideDivider px="md">
        The first item
      </ListItem>
      <ListItem>The second item</ListItem>
      <ListItem>The third item</ListItem>
      <ListItem>The forth item</ListItem>
      <ListItem>The fifth item</ListItem>
    </List>
  );
}

export const Basic: Story = {
  render: props => <Component {...props} />,
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      {sizes.map(size => (
        <div key={size}>
          <Paragraph align="center" mb="xs" size="lg">
            {size}
          </Paragraph>
          <Component {...props} size={size} />
        </div>
      ))}
    </Spacer>
  ),
};

export const Horizontal: Story = {
  args: {
    minWidth: 150,
    orientation: 'horizontal',
    radius: 'xl',
    shadow: 'low',
  },
  argTypes: {
    orientation: disableControl(),
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
    children: (
      <>
        <ListItem>
          <H3 mb="xs">Users</H3>
          <Paragraph>The users inside this group</Paragraph>
        </ListItem>
        <ListItem>
          <Spacer>
            <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
            <Box>
              <H6 mb={0}>John Smith</H6>
              <Paragraph>Admin</Paragraph>
            </Box>
          </Spacer>
        </ListItem>
      </>
    ),
    hideBorder: true,
    radius: 'none',
  },
};
