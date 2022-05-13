import {
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MenuItem } from './Item';

import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';
import { getTheme, recursiveChildrenMap } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { ComponentProps, StyledProps, WithColor } from '../types';

export interface MenuKnownProps extends StyledProps, WithColor {
  children: ReactNode;
  disabled?: boolean;
  /** @default Icon with more-vertical-o */
  icon?: ReactElement;
  onToggle?: (status: boolean) => void;
  /** @default right */
  positionX?: 'left' | 'right';
  /** @default bottom */
  positionY?: 'bottom' | 'top';
}

export type MenuProps = ComponentProps<HTMLDivElement, MenuKnownProps>;

interface MenuItemsProps extends Pick<MenuProps, 'positionX' | 'positionY'> {
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
  const { active, positionX, positionY } = props;
  const { grayDarker, grayScale, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    border-radius: ${radius.xxs};
    box-shadow: ${shadow.mid};
    color: ${darkMode ? grayScale['20'] : grayDarker};
    margin-top: ${spacing.xxs};
    min-width: 15rem;
    overflow: hidden;
    position: absolute;
    top: 100%;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.3s;
    z-index: 10;

    ${active &&
    css`
      transform: scaleY(1);
    `}

    ${positionY === 'top' &&
    css`
      bottom: 100%;
      margin-top: 0;
      margin-bottom: ${spacing.xxs};
      top: auto;
      transform-origin: bottom;
    `}

    ${positionX === 'left' &&
    css`
      left: 0;
    `}

    ${positionX === 'right' &&
    css`
      right: 0;
    `}
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
    disabled,
    icon = <Icon name="more-vertical-o" size={24} title={null} />,
    onToggle,
    positionX,
    positionY,
    shade,
    variant,
  } = props;
  const [active, setActive] = useState(false);
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

  useEffect(() => {
    if (active) {
      document.addEventListener('click', handleClickOutside);
    }

    if (onToggle) {
      onToggle(active);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [active, handleClickOutside, onToggle]);

  const handleClickMenu = useCallback(() => {
    setActive(a => !a);
  }, []);

  return (
    <StyledMenu ref={mergeRefs([localRef, ref])} data-component-name="Menu">
      <StyledMenuButton
        aria-label={active ? 'Close menu' : 'Open menu'}
        data-component-name="MenuButton"
        disabled={disabled}
        onClick={handleClickMenu}
        title={active ? 'Close menu' : 'Open menu'}
        type="button"
      >
        {icon}
      </StyledMenuButton>
      <StyledMenuItems
        active={active}
        data-component-name="MenuItems"
        positionX={positionX}
        positionY={positionY}
      >
        {recursiveChildrenMap(
          children,
          { closeMenu: handleClickMenu, shade, variant },
          { filter: MenuItem },
        )}
      </StyledMenuItems>
    </StyledMenu>
  );
});

Menu.defaultProps = {
  disabled: false,
  positionX: 'right',
  positionY: 'bottom',
};

export { MenuDivider } from './Divider';
export { MenuItem } from './Item';
