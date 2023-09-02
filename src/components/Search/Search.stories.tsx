import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, Paragraph } from '~';

import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, Search } from './Search';
import { SearchItem } from './types';

type Story = StoryObj<typeof Search>;

export default {
  title: 'Navigation/Search',
  component: Search,
  args: {
    ...defaultProps,
    width: 260,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    items: disableControl(),
    noResultsLabel: { control: 'text' },
    onFocus: disableControl(),
  },
  parameters: {
    layout: 'fullscreen',
    minHeight: 300,
    paddingDocs: 'md',
  },
} satisfies Meta<typeof Search>;

const users = [
  { name: 'John Smith', position: 'Admin', image: 'https://i.pravatar.cc/300?img=68' },
  {
    name: 'Maria Garcia',
    position: 'Admin',
    image: 'https://i.pravatar.cc/300?img=19',
  },
  { accent: 'green', name: 'William Brown Jones', position: 'Manager' },
  { name: 'Martha Johnson', position: 'Manager', image: 'https://i.pravatar.cc/300?img=49' },
  { name: 'Sarah Goldstein', position: 'Member', image: 'https://i.pravatar.cc/300?img=38' },
  { name: 'Robert Rodriguez', position: 'Member', image: 'https://i.pravatar.cc/300?img=18' },
  { name: 'George Miller' },
];

const items: SearchItem[] = users.map(d => ({
  accent: d.accent,
  label: (
    <Box display="flex">
      <Avatar bg={d.accent} image={d.image} name={d.name} />
      <Box ml="xs">
        <Paragraph bold>{d.name}</Paragraph>
        {d.position && (
          <Paragraph size="mid" skipMarginTop>
            {d.position}
          </Paragraph>
        )}
      </Box>
    </Box>
  ),
  value: d.name,
}));

export const Basic: Story = {
  args: {
    items,
  },
};
