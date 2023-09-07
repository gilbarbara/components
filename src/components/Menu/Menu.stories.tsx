import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { Avatar, Box, ButtonUnstyled, H6, Icon, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
} from '~/stories/__helpers__';

import { MenuDivider } from './Divider';
import { MenuItem } from './Item';
import { defaultProps, Menu } from './Menu';

type Story = StoryObj<typeof Menu>;

export default {
  title: 'Navigation/Menu',
  component: Menu,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    children: disableControl(),
    component: disableControl(),
  },
  parameters: {
    minHeight: 200,
  },
} satisfies Meta<typeof Menu>;

export const Basic: Story = {
  render: function Render(props) {
    const handleClick = (closeMenu: () => void, name?: string) => {
      return () => {
        closeMenu();

        if (name) {
          action(name)();
        }
      };
    };

    return (
      <Menu {...props}>
        <>
          <MenuItem disabled>
            <Spacer>
              <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
              <Box>
                <H6 mb={0}>John Smith</H6>
                <Paragraph>Admin</Paragraph>
              </Box>
            </Spacer>
          </MenuItem>
          <MenuDivider />
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={action('Configuration')}>
            <ButtonUnstyled>Configuration</ButtonUnstyled>
          </MenuItem>
        </>
        <MenuItem bg="green">
          {({ closeMenu }) => (
            <ButtonUnstyled onClick={handleClick(closeMenu, 'Help')}>Help</ButtonUnstyled>
          )}
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="red" onClick={action('Logout')}>
          {({ closeMenu }) => (
            <ButtonUnstyled onClick={closeMenu}>
              <a href="#logout">Logout</a>
            </ButtonUnstyled>
          )}
        </MenuItem>
      </Menu>
    );
  },
};

export const WithComponentAndHover: Story = {
  args: {
    position: 'bottom-left',
    trigger: 'hover',
  },
  argTypes: {
    trigger: disableControl(),
  },
  render: props => (
    <Menu
      {...props}
      component={
        <Spacer gap="xxs">
          <Icon name="plus-o" /> Add Item
        </Spacer>
      }
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>Configuration</MenuItem>
      <MenuItem>Help</MenuItem>
      <MenuDivider />
      <MenuItem bg="red">
        <a href="#logout">Logout</a>
      </MenuItem>
    </Menu>
  ),
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
  },
};
