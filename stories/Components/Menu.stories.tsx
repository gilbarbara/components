import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';
import { ButtonBase, Icon, Spacer } from 'src';
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

export const Basic = (props: MenuProps) => {
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
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={action('Configuration')}>
          <ButtonBase>Configuration</ButtonBase>
        </MenuItem>
      </>
      <MenuItem>
        {({ closeMenu }) => <ButtonBase onClick={handleClick(closeMenu, 'Help')}>Help</ButtonBase>}
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={action('Logout')} variant="red">
        {({ closeMenu }) => (
          <ButtonBase onClick={closeMenu}>
            <a href="#logout">Logout</a>
          </ButtonBase>
        )}
      </MenuItem>
    </Menu>
  );
};

export const WithComponentAndHover = (props: MenuProps) => {
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
};

WithComponentAndHover.args = {
  trigger: 'hover',
};

WithComponentAndHover.argTypes = {
  trigger: disableControl(),
};
