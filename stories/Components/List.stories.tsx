import { Meta } from '@storybook/react';

import { List, ListProps } from 'src/List';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from '../../src';
import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  marginProps,
} from '../__helpers__';

export default {
  title: 'Components/List',
  component: List,
  args: {
    ...List.defaultProps,
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
} as Meta<typeof List>;

export const Basic = {
  render: (props: ListProps) => {
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

export const Horizontal = {
  args: {
    direction: 'horizontal',
    radius: 'xl',
    shadow: 'low',
    variant: 'black',
  },
  argTypes: {
    direction: disableControl(),
  },
  render: (props: ListProps) => {
    const items = ['Contrast: 4.1', 'Luminance: 2', 'Hue: 344', 'Saturation: 100', 'Lightness: 50'];

    return <List {...props} items={items} />;
  },
};

export const WithComponents = {
  args: {
    border: false,
    items: [
      <Box>
        <H3 mb="xs">Brown Fox</H3>
        <Paragraph>The quick brown fox jumps over the lazy dog</Paragraph>
      </Box>,
      <Spacer>
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
