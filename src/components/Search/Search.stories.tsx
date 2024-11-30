import { useState } from 'react';
import { objectKeys, sleep, sortByLocaleCompare } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { clearAllMocks, expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Avatar, Box, Flex, Paragraph } from '~';

import { colors } from '~/modules/theme';

import users from '~/stories/__fixtures__/users.json';
import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';
import { ColorVariant } from '~/types';

import { defaultProps, Search, SearchItem } from './Search';

type Story = StoryObj<typeof Search>;

export default {
  title: 'Components/Search',
  // category: 'Navigation',
  component: Search,
  args: {
    ...defaultProps,
    onSelect: action('onSelect'),
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

const accentMap: Record<string, { color: ColorVariant; count: number }> = {};

function getAccent(team: string) {
  if (!accentMap[team]) {
    const colorNames = objectKeys(colors);
    const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
    const accentMapLength = Object.keys(accentMap).length;

    const colorKey = colorNames[accentMapLength] ?? randomColor;

    accentMap[team] = { color: colorKey, count: 1 };
  } else {
    accentMap[team].count += 1;
  }

  return accentMap[team].color;
}

const defaultItems: SearchItem[] = users
  .slice(0, 20)
  .map(d => ({
    accent: getAccent(d.team),
    label: (
      <Flex>
        <Avatar image={d.avatar} name={d.name} />
        <Box ml="xs">
          <Paragraph bold>{d.name}</Paragraph>
          <Paragraph size="sm" skipMarginTop>
            {d.team}
          </Paragraph>
        </Box>
      </Flex>
    ),
    value: d.name,
  }))
  .sort(sortByLocaleCompare('value'));

export const Basic: Story = {
  args: {
    icon: 'users',
    items: defaultItems,
  },
};

export const ExternalData: Story = {
  argTypes: {
    onSearch: disableControl(),
  },
  args: {
    remote: true,
  },
  render: function Render(props) {
    const [items, setItems] = useState([] as SearchItem[]);

    const handleSearch = (value: string) => {
      setItems(
        defaultItems.filter(d => !!value && d.value.toLowerCase().includes(value.toLowerCase())),
      );
    };

    return <Search {...props} items={items} onSearch={handleSearch} />;
  },
};

const mockOnBlur = fn();
const mockOnFocus = fn();
const mockOnSearch = fn();
const mockOnSelect = fn();
const mockOnType = fn();

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    items: defaultItems,
    onBlur: mockOnBlur,
    onFocus: mockOnFocus,
    onSearch: mockOnSearch,
    onSearchDebounce: 0,
    onSelect: mockOnSelect,
    onType: mockOnType,
  },
  render: Basic.render,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await sleep(0.5);

    const input = canvas.getByTestId('SearchInput');

    await step('should dispatch the onFocus callback', async () => {
      clearAllMocks();

      await userEvent.click(input);
      await waitFor(() => {
        expect(mockOnFocus).toHaveBeenCalledTimes(1);
      });
    });

    await step('should render the items', async () => {
      await expect(canvas.getAllByTestId('SearchItem')).toHaveLength(20);
    });

    await step('should select an item', async () => {
      clearAllMocks();

      const value = canvas.getAllByTestId('SearchItem')[0].getAttribute('data-value') ?? '';

      await userEvent.click(canvas.getByText(value));
      await expect(mockOnSelect).toHaveBeenNthCalledWith(1, value);
    });

    await step('should render "Nothing found" if search returned no results', async () => {
      clearAllMocks();

      await userEvent.type(canvas.getByTestId('SearchInput'), 'xyz');

      await waitFor(() => {
        expect(canvas.getByText('Nothing found')).toBeInTheDocument();
      });

      await expect(mockOnType).toHaveBeenCalledTimes(3);
      await expect(mockOnSearch).toHaveBeenLastCalledWith('xyz');
      await expect(mockOnSelect).toHaveBeenCalledTimes(0);
    });
  },
};
