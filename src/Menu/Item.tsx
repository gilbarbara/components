import { Children, isValidElement, MouseEventHandler, ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorVariant, getTheme } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { Paragraph } from '../Paragraph';
import { WithColor } from '../types';

interface ChildProps {
  closeMenu?: () => void;
}

export interface MenuItemProps extends ChildProps, WithColor {
  children: ((props: Required<ChildProps>) => ReactNode) | ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const StyledMenuItem = styled(
  'div',
  getStyledOptions(),
)<MenuItemProps>(props => {
  const { shade, variant = 'primary' } = props;
  const { grayDarker, grayScale, spacing, typography, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const themeColor = darkMode ? grayScale['20'] : grayDarker;

  const { bg, color } = getColorVariant(variant, shade, variants);

  return css`
    color: ${themeColor};
    cursor: pointer;
    font-size: ${typography.mid.fontSize};
    transition: background-color 0.3s;

    &:hover,
    &:active {
      background-color: ${bg};
      color: ${color};

      * {
        color: ${color};
      }
    }

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

export function MenuItem({ children, closeMenu, onClick, ...rest }: MenuItemProps): JSX.Element {
  const handleClick = useCallback(
    event => {
      if (!is.function(children) && closeMenu) {
        closeMenu();
      }

      if (onClick) {
        onClick(event);
      }
    },
    [children, closeMenu, onClick],
  );

  let content = children;

  if (is.function(children) && closeMenu) {
    content = children({ closeMenu });
  } else if (!Children.toArray(children).every(d => isValidElement(d))) {
    content = <Paragraph>{children}</Paragraph>;
  }

  return (
    <StyledMenuItem data-component-name="MenuItem" onClick={handleClick} {...rest}>
      {content}
    </StyledMenuItem>
  );
}
