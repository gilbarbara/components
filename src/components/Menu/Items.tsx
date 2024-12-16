import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';
import { easing } from '~/modules/theme';

import { WithTheme } from '~/types';

import { MenuItemsProps, useMenu } from './useMenu';

const StyledMenuItems = styled('div', getStyledOptions())<
  Omit<MenuItemsProps, 'id'> & WithTheme & { isActive: boolean }
>(
  {
    position: 'absolute',
    transform: 'scaleY(0)',
  },
  props => {
    const { bg, isActive, isOpen, minWidth, orientation, position, theme } = props;
    const { darkMode, grayScale, radius, shadow, spacing, white, zIndex } = theme;
    const [positionMain, positionCross] = position.split('-');

    let bgColor = darkMode ? grayScale['800'] : white;

    if (bg) {
      bgColor = getColorTokens(bg, null, theme).mainColor;
    }

    return css`
      transition: transform 0.3s ${easing};

      ${isActive &&
      isOpen &&
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
        background-color: ${bgColor};
        border-radius: ${radius.xxs};
        box-shadow: ${shadow.low};
        color: ${darkMode ? grayScale['200'] : grayScale['800']};
        display: ${orientation === 'horizontal' ? 'flex' : 'block'};
        flex-wrap: ${orientation === 'horizontal' ? 'wrap' : undefined};
        list-style: none;
        margin: 0;
        min-width: ${px(minWidth)};
        overflow: hidden;
        padding: 0;
        z-index: ${zIndex.xxs};

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
  },
);

export function MenuItems(props: MenuItemsProps) {
  const {
    componentProps: { children, id, isOpen, orientation, ...rest },
    getDataAttributes,
  } = useMenu<MenuItemsProps>(props);
  const [isActive, setActive] = useState(isOpen);

  useEffect(() => {
    setActive(s => (isOpen ? true : s));
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setActive(false);
    }
  };

  return (
    <StyledMenuItems
      isActive={isActive}
      isOpen={isOpen}
      {...getDataAttributes('MenuItems')}
      data-state={isOpen ? 'open' : 'closed'}
      onTransitionEnd={handleTransitionEnd}
      orientation={orientation}
      {...rest}
    >
      {(isOpen || isActive) && (
        <ul aria-orientation={orientation} id={id} role="menu">
          {children}
        </ul>
      )}
    </StyledMenuItems>
  );
}
