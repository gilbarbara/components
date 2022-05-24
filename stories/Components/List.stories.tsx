import { ComponentMeta } from '@storybook/react';
import { List, ListProps } from 'src/List';

import { Avatar, Box, H3, H5, Paragraph, Spacer } from '../../src';
import { colorProps, disableControl, hideProps, layoutProps, marginProps } from '../__helpers__';

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
    ...layoutProps({ display: 'flex' }),
    ...marginProps(),
    items: disableControl(),
  },
} as ComponentMeta<typeof List>;

export const Basic = (props: ListProps) => {
  const items = [
    {
      content: 'The first item',
      variant: 'primary',
    },
    'The second item',
    'The third item',
    'The forth item',
    'The fifth item',
  ];

  return <List {...props} items={items} />;
};

export const Horizontal = (props: ListProps) => {
  const items = ['Contrast: 4.1', 'Luminance: 2', 'Hue: 344', 'Saturation: 100', 'Lightness: 50'];

  return <List {...props} items={items} />;
};

Horizontal.args = {
  direction: 'horizontal',
  radius: 'xl',
  shadow: 'low',
  variant: 'black',
};
Horizontal.argTypes = {
  direction: disableControl(),
};

export const WithComponents = (props: ListProps) => <List {...props} />;
WithComponents.args = {
  borderless: true,
  items: [
    <Box>
      <H3 mb="xs">Brown Fox</H3>
      <Paragraph>The quick brown fox jumps over the lazy dog</Paragraph>
    </Box>,
    <Spacer>
      <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
      <Box>
        <H5>John Smith</H5>
        <Paragraph>Admin</Paragraph>
      </Box>
    </Spacer>,
  ],
  radius: false,
};
