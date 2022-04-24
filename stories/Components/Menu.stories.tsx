import * as React from 'react';
import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';

import { Avatar, ButtonBase, Menu, MenuDivider, MenuItem } from '../../src';

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    icon: {
      control: 'select',
      defaultValue: 'icon',
      options: ['icon', 'avatar'],
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    onToggle: {
      table: { disable: true },
    },
    positionX: {
      defaultValue: 'right',
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    positionY: {
      defaultValue: 'bottom',
      control: 'inline-radio',
      options: ['top', 'bottom'],
    },
    shade: {
      defaultValue: 'mid',
    },
    variant: {
      control: 'select',
      defaultValue: 'primary',
    },
  },
};

export function Basic({ icon, ...props }: any) {
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
