import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';
import { Avatar, ButtonBase } from 'src';
import { Menu, MenuDivider, MenuItem, MenuProps } from 'src/Menu';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: { MenuItem, MenuDivider },
  args: {
    disabled: false,
    icon: 'icon',
    positionX: 'right',
    positionY: 'bottom',
  },
  argTypes: {
    ...hideProps(),
    icon: { control: 'select', options: ['icon', 'avatar'] },
    positionX: { control: 'inline-radio' },
    positionY: { control: 'inline-radio' },
  },
  parameters: {
    minHeight: 200,
  },
};

export function Basic({ icon, ...props }: MenuProps & { icon: string }) {
  const Component =
    icon === 'avatar' ? <Avatar name="Test User" variant={props.variant} /> : undefined;

  const handleClick = (closeMenu: GenericFunction, name?: string) => {
    return () => {
      closeMenu();

      if (name) {
        action(name)();
      }
    };
  };

  return (
    <Menu {...props} icon={Component} onToggle={action('onToggle')}>
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
}
