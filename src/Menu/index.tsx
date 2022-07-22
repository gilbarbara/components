import { forwardRef, ReactElement, useCallback, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useUpdateEffect } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { MenuItem } from './Item';

import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';
import { getTheme, px, recursiveChildrenEnhancer } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { easing } from '../modules/theme';
import { ComponentProps, Position, StyledProps, WithChildren, WithColor, WithOpen } from '../types';

export interface MenuKnownProps extends StyledProps, WithChildren, WithColor, WithOpen {
  /** @default An Icon with more-vertical-o */
  component?: ReactElement;
  disabled?: boolean;
  /** @default 200 */
  minWidth?: StringOrNumber;
  onToggle?: (status: boolean) => void;
  /** @default bottom-right */
  position?: Position;
  /** @default click */
  trigger?: 'click' | 'hover';
}

export type MenuProps = ComponentProps<HTMLDivElement, MenuKnownProps>;

interface MenuItemsProps extends Required<Pick<MenuProps, 'minWidth' | 'position'>> {
  active: boolean;
}

const StyledMenu = styled.div`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
`;

const StyledMenuItems = styled(
  'div',
  getStyledOptions(),
)<MenuItemsProps>(props => {
  const { active, minWidth, position } = props;
  const [positionMain, positionCross] = position.split('-');

  const { grayDarker, grayScale, radius, shadow, spacing, white } = getTheme(props);
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

  > div {
      background-color: ${darkMode ? grayDarker : white};
      border-radius: ${radius.xxs};
      box-shadow: ${shadow.low};
      color: ${darkMode ? grayScale['20'] : grayDarker};
      min-width: ${px(minWidth)};
      overflow: hidden;

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

const StyledMenuButton = styled(ButtonBase)(props => {
  const { spacing } = getTheme(props);

  return css`
    display: flex;
    min-height: ${spacing.lg};
    min-width: ${spacing.lg};

    :disabled {
      cursor: not-allowed;
    }
  `;
});

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    children,
    component = <Icon name="more-vertical-o" size={24} title={null} />,
    disabled,
    minWidth = 200,
    onToggle,
    open,
    position = 'bottom-right',
    shade,
    trigger,
    variant,
  } = props;
  const [active, setActive] = useState(open ?? false);
  const localRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (localRef.current?.contains(target) || !active) {
        return;
      }

      document.removeEventListener('click', handleClickOutside);

      setActive(false);
    },
    [active],
  );

  useUpdateEffect(() => {
    if (active && !is.boolean(open)) {
      document.addEventListener('click', handleClickOutside);
    }

    if (onToggle) {
      onToggle(active);
    }

    return () => {
      if (!is.boolean(open)) {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [active, handleClickOutside, onToggle, open]);

  const handleToggleMenu = useCallback(() => {
    if (disabled || is.boolean(open)) {
      return;
    }

    setActive(a => !a);
  }, [disabled, open]);

  return (
    <StyledMenu
      ref={mergeRefs([localRef, ref])}
      data-component-name="Menu"
      onMouseEnter={trigger === 'hover' ? handleToggleMenu : undefined}
      onMouseLeave={trigger === 'hover' ? handleToggleMenu : undefined}
    >
      <StyledMenuButton
        aria-label={active ? 'Close menu' : 'Open menu'}
        data-component-name="MenuButton"
        disabled={disabled}
        onClick={trigger === 'click' ? handleToggleMenu : undefined}
        title={active ? 'Close menu' : 'Open menu'}
        type="button"
      >
        {component}
      </StyledMenuButton>
      <StyledMenuItems
        active={active}
        data-component-name="MenuItems"
        minWidth={minWidth}
        position={position}
      >
        <div data-component-name="MenuItemsWrapper">
          {recursiveChildrenEnhancer(
            children,
            { closeMenu: handleToggleMenu, shade, variant },
            { componentType: MenuItem },
          )}
        </div>
      </StyledMenuItems>
    </StyledMenu>
  );
});

Menu.defaultProps = {
  disabled: false,
  minWidth: 200,
  position: 'bottom-right',
  trigger: 'click',
  variant: 'primary',
};

export { MenuDivider } from './Divider';
export { MenuItem } from './Item';
