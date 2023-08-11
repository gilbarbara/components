import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, Paragraph } from '~';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';
import { SearchItem } from '~/types';

import { defaultProps, Search } from './Search';

type Story = StoryObj<typeof Search>;

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    ...defaultProps,
    width: 260,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    items: disableControl(),
    noResultsLabel: { control: 'text' },
    onFocus: disableControl(),
  },
  parameters: {
    layout: 'fullscreen',
    minHeight: 300,
  },
} satisfies Meta<typeof Search>;

const users = [
  { name: 'John Smith', position: 'Admin', image: 'https://i.pravatar.cc/300?img=68' },
  { name: 'Maria Garcia', position: 'Admin', image: 'https://i.pravatar.cc/300?img=19' },
  { name: 'William Brown Jones', position: 'Manager' },
  { name: 'Martha Johnson', position: 'Manager', image: 'https://i.pravatar.cc/300?img=49' },
  { name: 'Sarah Goldstein', position: 'Member', image: 'https://i.pravatar.cc/300?img=38' },
  { name: 'Robert Rodriguez', position: 'Member', image: 'https://i.pravatar.cc/300?img=18' },
  { name: 'George Miller' },
];

const items: SearchItem[] = users.map(d => ({
  label: (
    <Box display="flex">
      <Avatar image={d.image} name={d.name} />
      <Box ml="xs">
        <Paragraph bold>{d.name}</Paragraph>
        {d.position && (
          <Paragraph shade="mid" size="mid" variant="gray">
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
