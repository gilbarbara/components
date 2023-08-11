import { Children, isValidElement, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { noop } from '@gilbarbara/helpers';
import is from 'is-lite';

import { getColorVariant, getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { Paragraph } from '~/components/Paragraph';

import { WithColor } from '~/types';

interface ChildProps {
  closeMenu?: () => void;
}

export interface MenuItemProps extends ChildProps, WithColor {
  children: ((props: Required<ChildProps>) => ReactNode) | ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const StyledMenuItem = styled(
  'div',
  getStyledOptions(),
)<Omit<MenuItemProps, 'closeMenu'>>(props => {
  const { disabled, shade, variant = 'primary' } = props;
  const { grayDarker, grayScale, spacing, typography, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const themeColor = darkMode ? grayScale['20'] : grayDarker;

  const { bg, color } = getColorVariant(variant, shade, variants);

  return css`
    color: ${themeColor};
    cursor: ${disabled ? 'default' : 'pointer'};
    font-size: ${typography.mid.fontSize};
    transition: background-color 0.3s;

    ${!disabled &&
    css`
      &:hover,
      &:active {
        background-color: ${bg};
        color: ${color};

        * {
          color: ${color};
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
