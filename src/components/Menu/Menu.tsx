import { forwardRef, ReactElement, useCallback, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { useMergeRefs } from '@gilbarbara/hooks';
import { StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { getTheme, recursiveChildrenEnhancer } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';
import { easing } from '~/modules/theme';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import {
  OmitElementProps,
  PositionX,
  PositionY,
  StyledProps,
  WithAccent,
  WithChildren,
  WithDisabled,
  WithOpen,
} from '~/types';

import { MenuItem } from './Item';

export interface MenuKnownProps
  extends StyledProps,
    WithAccent,
    WithChildren,
    WithDisabled,
    WithOpen {
  /** @default An Icon with more-vertical-o */
  component?: ReactElement;
  /** @default 200 */
  minWidth?: StringOrNumber;
  onToggle?: (status: boolean) => void;
  /** @default bottom-right */
  position?: PositionX | PositionY;
  /** @default click */
  trigger?: 'click' | 'hover';
}

export type MenuProps = OmitElementProps<HTMLDivElement, MenuKnownProps>;

interface MenuItemsProps extends Required<Pick<MenuProps, 'minWidth' | 'position'>> {
  active: boolean;
}

export const defaultProps = {
  accent: 'primary',
  component: <Icon name="more-vertical-o" size={24} title={null} />,
  disabled: false,
  minWidth: 200,
  position: 'bottom-right',
  trigger: 'click',
} satisfies Omit<MenuProps, 'children'>;

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

  > div {
      background-color: ${darkMode ? grayScale['800'] : white};
      border-radius: ${radius.xxs};
      box-shadow: ${shadow.low};
      color: ${darkMode ? grayScale['200'] : grayScale['800']};
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

const StyledMenuButton = styled(ButtonUnstyled)(props => {
  const { button, spacing } = getTheme(props);

  return css`
    border-radius: ${button.sm.borderRadius};
    display: flex;
    min-height: ${spacing.lg};
    min-width: ${spacing.lg};

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `;
});

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { accent, children, component, disabled, minWidth, onToggle, open, position, trigger } = {
    ...defaultProps,
    ...props,
  };
  const [active, setActive] = useState(open ?? false);
  const localRef = useRef<HTMLDivElement>(null);
  const mergedRefs = useMergeRefs(localRef, ref);

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (target && (localRef.current?.contains(target as HTMLElement) || !active)) {
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

    onToggle?.(active);

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
      ref={mergedRefs}
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
        data-state={active ? 'open' : 'closed'}
        minWidth={minWidth}
        position={position}
      >
        <div data-component-name="MenuItemsWrapper">
          {recursiveChildrenEnhancer(
            children,
            { closeMenu: handleToggleMenu, accent },
            { componentType: MenuItem },
          )}
        </div>
      </StyledMenuItems>
    </StyledMenu>
  );
});

Menu.displayName = 'Menu';
