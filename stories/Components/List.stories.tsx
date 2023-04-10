import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from 'src';
import { defaultProps, List } from 'src/List';

import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  marginProps,
} from '../__helpers__';

type Story = StoryObj<typeof List>;

export default {
  title: 'Components/List',
  component: List,
  args: {
    ...defaultProps,
    minWidth: 260,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'flex' }),
    ...marginProps(),
    items: disableControl(),
  },
} satisfies Meta<typeof List>;

export const Basic: Story = {
  render: props => {
    return (
      <List
        {...props}
        items={[
          {
            content: 'The first item',
            variant: 'primary',
          },
          'The second item',
          'The third item',
          'The forth item',
          'The fifth item',
        ]}
      />
    );
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    radius: 'xl',
    shadow: 'low',
    variant: 'black',
  },
  argTypes: {
    direction: disableControl(),
  },
  render: props => {
    const items = ['Contrast: 4.1', 'Luminance: 2', 'Hue: 344', 'Saturation: 100', 'Lightness: 50'];

    return <List {...props} items={items} />;
  },
};

export const WithComponents: Story = {
  args: {
    border: false,
    items: [
      <Box key="1">
        <H3 mb="xs">Users</H3>
        <Paragraph>The users inside this group</Paragraph>
      </Box>,
      <Spacer key="2">
        <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
        <Box>
          <H6 mb={0}>John Smith</H6>
          <Paragraph>Admin</Paragraph>
        </Box>
      </Spacer>,
    ],
    radius: false,
  },
};
