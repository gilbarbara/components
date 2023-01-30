import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';

import { ButtonUnstyled, Icon, Spacer } from 'src';
import { Menu, MenuDivider, MenuItem, MenuProps } from 'src/Menu';

import { colorProps, disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: { MenuItem, MenuDivider },
  args: Menu.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    children: disableControl(),
    component: disableControl(),
  },
  parameters: {
    minHeight: 200,
  },
};

export const Basic = {
  render: (props: MenuProps) => {
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

export const WithComponentAndHover = {
  args: {
    trigger: 'hover',
  },
  argTypes: {
    trigger: disableControl(),
  },
  render: (props: MenuProps) => {
    return (
      <Menu
        {...props}
        component={
          <Spacer gap="xxs">
            <Icon name="add" /> Add Item
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
