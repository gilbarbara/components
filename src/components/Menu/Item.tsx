import { isValidElement, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, paddingStyles } from '~/modules/system';

import { WithAccent, WithPadding, WithTheme } from '~/types';

import { MenuItemProps, useMenu, useMenuContext } from './useMenu';

export const StyledMenuItem = styled('li', getStyledOptions())<
  MenuItemProps & WithAccent & WithPadding & WithTheme & { disableHover: boolean }
>(
  {
    display: 'flex',
    transition: 'background-color 0.3s',
  },
  props => {
    const { accent = 'primary', bg, color, disabled = false, disableHover, theme, wrap } = props;
    const { darkMode, grayScale, opacityDisabled, spacing, typography } = theme;

    const themeColor = darkMode ? grayScale['200'] : grayScale['800'];

    const { mainColor, textColor } = getColorTokens(accent, color, theme);

    let bgColor;

    if (bg) {
      bgColor = getColorTokens(bg, null, theme).mainColor;
    }

    return css`
      background-color: ${bgColor};
      color: ${themeColor};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      font-size: ${typography.md.fontSize};
      opacity: ${disabled ? opacityDisabled : 1};
      padding: ${spacing.xs} ${spacing.sm};
      white-space: ${wrap ? 'normal' : 'nowrap'};
      ${paddingStyles(props)};

      a {
        color: ${themeColor};
        text-decoration: none;
      }

      ${!disabled &&
      !disableHover &&
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
  },
);

export const StyledMenuItemContent = styled('span')`
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

export function MenuItem(props: MenuItemProps) {
  const {
    componentProps: {
      accent,
      children,
      disableAutoClose = false,
      disabled,
      disableHover = false,
      onToggle,
      ...rest
    },
    getDataAttributes,
  } = useMenu<MenuItemProps>(props);
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
      accent={accent ?? state.accent}
      {...getDataAttributes('MenuItem')}
      disableHover={disableHover}
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
