import { useState } from 'react';
import { objectKeys, sortByLocaleCompare } from '@gilbarbara/helpers';
// import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';

// import { userEvent, waitFor, within } from '@storybook/testing-library';
import { Avatar, Box, Paragraph } from '~';

import { colors } from '~/modules/theme';

import { users } from '~/stories/__fixtures__';
import {
  colorProps,
  disableControl,
  hideProps,
  // hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';
import { Variant } from '~/types';

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

const accentMap: Record<string, { color: Variant; count: number }> = {};

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
      <Box flexBox>
        <Avatar image={d.avatar} name={d.name} />
        <Box ml="xs">
          <Paragraph bold>{d.name}</Paragraph>
          <Paragraph size="sm" skipMarginTop>
            {d.team}
          </Paragraph>
        </Box>
      </Box>
    ),
    value: d.name,
  }))
  .sort(sortByLocaleCompare('value'));

export const Basic: Story = {
  args: {
    icon: 'users',
    items: defaultItems,
  },
  render: props => <Search {...props} />,
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

// const onFocusMock = jest.fn();
// const onSearchMock = jest.fn();
// const onSelectMock = jest.fn();
// const onTypeMock = jest.fn();

// function resetMocks() {
//   onFocusMock.mockClear();
//   onSearchMock.mockClear();
//   onSelectMock.mockClear();
//   onTypeMock.mockClear();
// }

// export const Tests: Story = {
//   ...hideStoryFromDocsPage(),
//   tags: ['hidden'],
//   args: {
//     items: defaultItems,
//     onFocus: onFocusMock,
//     onSearch: onSearchMock,
//     onSearchDebounce: 0,
//     onSelect: onSelectMock,
//     onType: onTypeMock,
//   },
//   render: Basic.render,
//   play: async ({ canvasElement, step }) => {
//     const canvas = within(canvasElement);
//
//     await canvas.findByTestId('Search');
//     const input = canvas.getByTestId('SearchInput');
//
//     await step('should dispatch the onFocus callback', async () => {
//       resetMocks();
//
//       await userEvent.click(input);
//       await waitFor(() => {
//         expect(onFocusMock).toHaveBeenCalledTimes(1);
//       });
//     });
//
//     await step('should render the items', async () => {
//       await expect(canvas.getAllByTestId('SearchItem')).toHaveLength(20);
//     });
//
//     await step('should select an item', async () => {
//       resetMocks();
//
//       const value = canvas.getAllByTestId('SearchItem')[0].getAttribute('data-value') ?? '';
//
//       await userEvent.click(canvas.getByText(value));
//       await expect(onSelectMock).toHaveBeenNthCalledWith(1, value);
//     });
//
//     await step('should render "Nothing found" if search returned no results', async () => {
//       resetMocks();
//
//       await userEvent.type(canvas.getByTestId('SearchInput'), 'xyz');
//
//       await waitFor(() => {
//         expect(canvas.getByText('Nothing found')).toBeInTheDocument();
//       });
//
//       await expect(onTypeMock).toHaveBeenCalledTimes(3);
//       await expect(onSearchMock).toHaveBeenLastCalledWith('xyz');
//       await expect(onSelectMock).toHaveBeenCalledTimes(0);
//     });
//   },
// };
