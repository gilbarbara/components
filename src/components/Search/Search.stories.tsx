import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { Avatar, Box, Paragraph } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';

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

const mockOnFocus = jest.fn();
const mockOnSearch = jest.fn();
const mockOnSelect = jest.fn();
const mockOnType = jest.fn();

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    items,
    onFocus: mockOnFocus,
    onSearch: mockOnSearch,
    onSelect: mockOnSelect,
    onType: mockOnType,
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnFocus.mockClear();
    mockOnSearch.mockClear();
    mockOnSelect.mockClear();
    mockOnType.mockClear();

    await canvas.findByTestId('Search');

    const input = canvas.getByTestId('SearchInput');

    await userEvent.click(input);
    await waitFor(() => {
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    await userEvent.type(canvas.getByTestId('SearchInput'), 'Jim');
    await expect(mockOnType).toHaveBeenCalledTimes(3);
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenNthCalledWith(1, 'Jim');
    });
    await expect(mockOnSelect).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(canvas.getByText('Nothing found')).toBeInTheDocument();
    });

    await userEvent.clear(canvas.getByTestId('SearchInput'));
    await userEvent.type(canvas.getByTestId('SearchInput'), 'John');
    await expect(mockOnType).toHaveBeenCalledTimes(8);
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'John');
    });
    await waitFor(() => {
      expect(canvas.getAllByTestId('SearchItem')).toHaveLength(2);
    });

    await userEvent.click(canvas.getByText('John Smith'));
    await expect(mockOnSelect).toHaveBeenNthCalledWith(1, 'John Smith');
  },
};
