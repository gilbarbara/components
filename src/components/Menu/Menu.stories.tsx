import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Avatar, Box, H6, Icon, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
} from '~/stories/__helpers__';

import { Menu, MenuItem, MenuSeparator, MenuTitle } from './index';
import { defaultProps } from './utils';

type Story = StoryObj<typeof Menu>;

export default {
  title: 'Navigation/Menu',
  component: Menu,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    button: disableControl(),
    children: disableControl(),
  },
  parameters: {
    minHeight: 300,
    layout: 'fullscreen',
    paddingDocs: 'md',
  },
} satisfies Meta<typeof Menu>;

export const Basic: Story = {
  render: props => {
    return (
      <Menu {...props}>
        <MenuTitle>
          <Spacer>
            <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
            <Box>
              <H6 mb={0}>John Smith</H6>
              <Paragraph>Admin</Paragraph>
            </Box>
          </Spacer>
        </MenuTitle>
        <MenuSeparator />
        <MenuItem onToggle={action('Profile')}>Profile</MenuItem>
        <MenuItem onToggle={action('Configuration')}>Configuration</MenuItem>
        <MenuSeparator />
        <MenuTitle>Documentation</MenuTitle>
        <MenuItem bg="purple" onToggle={action('Help')}>
          Help
        </MenuItem>
        <MenuItem bg="green" onToggle={action('Guide')}>
          Usage Guide
        </MenuItem>
        <MenuSeparator />
        <MenuItem bg="red" onToggle={action('Logout')}>
          Logout
        </MenuItem>
      </Menu>
    );
  },
};

export const WithCustomButtonAndHover: Story = {
  args: {
    disableKeyboardNavigation: true,
    position: 'right-top',
    trigger: 'hover',
  },
  argTypes: {
    trigger: disableControl(),
  },
  render: props => (
    <Menu
      {...props}
      button={
        <>
          Create
          <Icon ml="xxs" name="chevron-right" />
        </>
      }
    >
      <MenuItem onToggle={action('file')}>New File</MenuItem>
      <MenuItem onToggle={action('video')}>New Video</MenuItem>
      <MenuItem onToggle={action('audio')}>New Audio</MenuItem>
      <MenuItem disabled onToggle={action('presentation')}>
        New Presentation
      </MenuItem>
      <MenuSeparator />
      <MenuItem bg="blue" onToggle={action('directory')}>
        New Directory
      </MenuItem>
    </Menu>
  ),
};

export const TestMouseInteractions: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  name: 'Test > Mouse',
  args: {
    onToggle: fn(),
  },
  render: WithCustomButtonAndHover.render,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await step('Open the menu', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Close the menu', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });

    await step('Open the menu again', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Select the first item', async () => {
      await userEvent.click(canvas.getByText('New File'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });

    await step('Open the menu one more time', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Click a disabled item', async () => {
      await userEvent.click(canvas.getByText('New Presentation'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Close the menu by clicking outside', async () => {
      await userEvent.click(document.body);
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });
  },
};

export const TestKeyboardInteractions: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  name: 'Test > Keyboard',
  args: {
    onToggle: fn(),
  },
  render: WithCustomButtonAndHover.render,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await step('Open the menu by typing Tab to the button and pressing Enter', async () => {
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(true);
    });

    await step('Close the menu by typing Escape', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(false);
    });

    await step('Re-open the menu by typing Enter', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(true);
    });

    await step('Select the first item by typing ArrowDown and Enter', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(false);
    });
  },
};

export const TestDisabledKeyboardAndBlur: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  name: 'Test > Disabled Keyboard and Blur',
  args: {
    disableCloseOnBlur: true,
    disableKeyboardNavigation: true,
    onToggle: fn(),
  },
  render: WithCustomButtonAndHover.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    // Open the menu by tabbing to the button and pressing enter
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(0);

    // Close the menu by typing escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(0);

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });

    await expect(args.onToggle).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(1);

    await userEvent.click(document.body);
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(1);
  },
};
