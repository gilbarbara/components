import { Children, isValidElement, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { noop } from '@gilbarbara/helpers';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { Paragraph } from '~/components/Paragraph';

import { WithAccent, WithColors, WithDisabled } from '~/types';

interface ChildProps {
  closeMenu?: () => void;
}

export interface MenuItemProps extends ChildProps, WithColors, WithDisabled {
  children: ((props: Required<ChildProps>) => ReactNode) | ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const StyledMenuItem = styled(
  'div',
  getStyledOptions(),
)<Omit<MenuItemProps, 'closeMenu'> & WithAccent>(props => {
  const { accent = 'primary', bg, color, disabled } = props;
  const { grayScale, spacing, typography, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);

  const themeColor = darkMode ? grayScale['200'] : grayScale['800'];

  const { mainColor, textColor } = getColorTokens(bg || accent, color, theme);

  return css`
    color: ${themeColor};
    cursor: ${disabled ? 'default' : 'pointer'};
    font-size: ${typography.mid.fontSize};
    transition: background-color 0.3s;

    ${!disabled &&
    css`
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
      display: flex !important;
      padding: ${spacing.xs} ${spacing.sm} !important;
      white-space: nowrap !important;
      width: 100%;
    }
  `;
});

export function MenuItem({
  children,
  closeMenu = noop,
  disabled,
  onClick,
  ...rest
}: MenuItemProps) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (!is.function(children) && closeMenu) {
      closeMenu();
    }

    if (onClick) {
      onClick(event);
    }
  };

  let content: ReactNode;

  if (is.function(children)) {
    content = children({ closeMenu });
  } else if (!Children.toArray(children).every(d => isValidElement(d))) {
    content = <Paragraph>{children}</Paragraph>;
  } else {
    content = children;
  }

  return (
    <StyledMenuItem
      data-component-name="MenuItem"
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </StyledMenuItem>
  );
}

MenuItem.displayName = 'MenuItem';
