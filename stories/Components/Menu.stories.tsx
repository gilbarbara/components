import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { ButtonUnstyled, Icon, Spacer } from 'src';
import { defaultProps, Menu, MenuDivider, MenuItem } from 'src/Menu';

import { colorProps, disableControl, hideProps } from '../__helpers__';

type Story = StoryObj<typeof Menu>;

export default {
  title: 'Components/Menu',
  component: Menu,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    children: disableControl(),
    component: disableControl(),
  },
  parameters: {
    minHeight: 200,
  },
} satisfies Meta<typeof Menu>;

export const Basic: Story = {
  render: props => {
    const handleClick = (closeMenu: GenericFunction, name?: string) => {
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
          <MenuItem disabled>Profile</MenuItem>
          <MenuItem onClick={action('Configuration')}>
            <ButtonUnstyled>Configuration</ButtonUnstyled>
          </MenuItem>
        </>
        <MenuItem>
          {({ closeMenu }) => (
            <ButtonUnstyled onClick={handleClick(closeMenu, 'Help')}>Help</ButtonUnstyled>
          )}
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={action('Logout')} variant="red">
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
    trigger: 'hover',
  },
  argTypes: {
    trigger: disableControl(),
  },
  render: props => {
    return (
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
        <MenuItem variant="red">
          <a href="#logout">Logout</a>
        </MenuItem>
      </Menu>
    );
  },
};
