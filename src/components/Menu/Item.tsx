import { isValidElement, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { useMenuContext } from '~/components/Menu/utils';

import { WithAccent, WithColors, WithDisabled, WithPadding } from '~/types';

export interface MenuItemProps extends WithColors, WithDisabled, WithPadding {
  children: ((props: { closeMenu: () => void }) => ReactNode) | ReactNode;
  /** @default false */
  disableAutoClose?: boolean;
  onToggle?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}

export const StyledMenuItem = styled(
  'li',
  getStyledOptions(),
)<MenuItemProps & WithAccent>(props => {
  const { accent = 'primary', bg, color, disabled } = props;
  const { grayScale, spacing, typography, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);

  const themeColor = darkMode ? grayScale['200'] : grayScale['800'];

  const { mainColor, textColor } = getColorTokens(bg ?? accent, color, theme);

  return css`
    color: ${themeColor};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    font-size: ${typography.md.fontSize};
    opacity: ${disabled ? 0.6 : 1};
    transition: background-color 0.3s;

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

    a {
      color: ${themeColor};
      text-decoration: none;
    }

    > * {
      display: flex;
      padding: ${spacing.xs} ${spacing.sm};
      white-space: nowrap;
      width: 100%;
    }
  `;
});

export function MenuItem(props: MenuItemProps) {
  const { children, disableAutoClose = false, disabled, onToggle, ...rest } = props;
  const { closeMenu, state } = useMenuContext();

  const handleToggle = (event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => {
    if (disabled) {
      return;
    }

    if ('code' in event && !state.disableKeyboardNavigation) {
      if (['Enter', 'Space'].includes(event.code)) {
        onToggle?.(event);

        if (!disableAutoClose) {
          closeMenu?.();
        }
      }
    } else {
      onToggle?.(event);

      if (!disableAutoClose) {
        closeMenu?.();
      }
    }
  };

  let content: ReactNode;

  if (is.function(children)) {
    content = children({ closeMenu });
  } else if (!isValidElement(children)) {
    content = <span>{children}</span>;
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
