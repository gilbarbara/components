import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';
import { easing } from '~/modules/theme';

import { MenuProps } from './types';

interface MenuItemsProps extends Required<Pick<MenuProps, 'minWidth' | 'position'>> {
  active: boolean;
  children: ReactNode;
  id: string;
}

const StyledMenuItemsWrapper = styled(
  'div',
  getStyledOptions(),
)<Omit<MenuItemsProps, 'id'>>(props => {
  const { active, minWidth, position } = props;
  const [positionMain, positionCross] = position.split('-');

  const { grayScale, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    position: absolute;
    transform: scaleY(0);
    transition: transform 0.3s ${easing};
    z-index: 10;

    ${active &&
    css`
      transform: scaleY(1);
    `}

    ${positionMain === 'bottom' &&
    css`
      top: 100%;
      transform-origin: top;
    `}

    ${positionMain === 'left' &&
    css`
      right: 100%;
    `}

    ${positionMain === 'right' &&
    css`
      left: 100%;
    `}

    ${positionMain === 'top' &&
    css`
      bottom: 100%;
      transform-origin: bottom;
    `}

    ${positionCross === 'bottom' &&
    css`
      bottom: 0;
      transform-origin: bottom;
    `}

    ${positionCross === 'left' &&
    css`
      left: 0;
    `}

    ${positionCross === 'right' &&
    css`
      right: 0;
    `}

    ${positionCross === 'top' &&
    css`
      top: 0;
      transform-origin: top;
    `}

  > ul {
      background-color: ${darkMode ? grayScale['800'] : white};
      border-radius: ${radius.xxs};
      box-shadow: ${shadow.low};
      color: ${darkMode ? grayScale['200'] : grayScale['800']};
      list-style: none;
      margin: 0;
      min-width: ${px(minWidth)};
      overflow: hidden;
      padding: 0;

      ${positionMain === 'bottom' &&
      css`
        margin-top: ${spacing.xxs};
      `}

      ${positionMain === 'left' &&
      css`
        margin-right: ${spacing.xxs};
      `}

      ${positionMain === 'right' &&
      css`
        margin-left: ${spacing.xxs};
      `}

      ${positionMain === 'top' &&
      css`
        margin-bottom: ${spacing.xxs};
      `}
    }
  `;
});

export function MenuItems(props: MenuItemsProps) {
  const { active, children, id, minWidth, position } = props;

  return (
    <StyledMenuItemsWrapper
      active={active}
      data-component-name="MenuItems"
      data-state={active ? 'open' : 'closed'}
      minWidth={minWidth}
      position={position}
    >
      <ul
        aria-orientation="vertical"
        data-component-name="MenuItemsWrapper"
        id={`menu-items-${id}`}
        role="menu"
      >
        {children}
      </ul>
    </StyledMenuItemsWrapper>
  );
}
