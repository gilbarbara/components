import { isValidElement, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { WithAccent } from '~/types';

import { MenuItemProps } from './types';
import { useMenuContext } from './utils';

export const StyledMenuItem = styled(
  'li',
  getStyledOptions(),
)<MenuItemProps & WithAccent>(props => {
  const { accent = 'primary', bg, color, disabled = false, wrap } = props;
  const { grayScale, opacityDisabled, spacing, typography, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);

  const themeColor = darkMode ? grayScale['200'] : grayScale['800'];

  const { mainColor, textColor } = getColorTokens(bg ?? accent, color, theme);

  return css`
    color: ${themeColor};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    font-size: ${typography.md.fontSize};
    opacity: ${disabled ? opacityDisabled : 1};
    padding: ${spacing.xs} ${spacing.sm} !important;
    transition: background-color 0.3s;
    white-space: ${wrap ? 'normal' : 'nowrap'};

    a {
      color: ${themeColor};
      text-decoration: none;
    }

    ${!disabled &&
    css`
      &:focus-visible,
      &:hover,
      &:active {
        background-color: ${mainColor};
        color: ${textColor};

        * {
          color: ${textColor};
        }
      }
    `};
  `;
});

export const StyledMenuItemContent = styled('span')`
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

export function MenuItem(props: MenuItemProps) {
  const { children, disableAutoClose = false, disabled, onToggle, ...rest } = props;
  const { closeMenu, state } = useMenuContext();

  const handleToggle = (event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => {
    if (disabled) {
      return;
    }

    if ('code' in event && !state.disableKeyboardNavigation) {
      if (['Enter', 'Space'].includes(event.code)) {
        onToggle?.(event, closeMenu);

        if (!disableAutoClose) {
          closeMenu();
        }
      }
    } else {
      onToggle?.(event, closeMenu);

      if (!disableAutoClose) {
        closeMenu();
      }
    }
  };

  let content: ReactNode;

  if (is.function(children)) {
    content = children({ closeMenu });
  } else if (!isValidElement(children)) {
    content = <StyledMenuItemContent>{children}</StyledMenuItemContent>;
  } else {
    content = children;
  }

  return (
    <StyledMenuItem
      accent={state.accent}
      data-component-name="MenuItem"
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleToggle}
      role="menuitem"
      tabIndex={disabled || state.disableKeyboardNavigation ? -1 : 0}
      {...rest}
    >
      {content}
    </StyledMenuItem>
  );
}

MenuItem.displayName = 'MenuItem';
