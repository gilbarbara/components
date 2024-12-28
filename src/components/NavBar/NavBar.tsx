import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { useMergeRefs } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { opacify } from 'colorizr';
import is from 'is-lite';

import { useScrollPosition } from '~/hooks/useScrollPosition';

import { getColorTokens } from '~/modules/colors';
import { splitReactChildren } from '~/modules/react-helpers';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { NavBarMenu } from './NavBarMenu';
import { NavBarProps, NavBarProvider, useNavBar } from './useNavBar';

const StyledNavBar = styled('nav', getStyledOptions())<
  SetRequired<
    NavBarProps,
    'bordered' | 'blurred' | 'blurredRadius' | 'height' | 'opacity' | 'placement' | 'position'
  > &
    WithTheme & { isHidden: boolean }
>(
  {
    width: '100%',
  },
  props => {
    const {
      bg,
      blurred,
      blurredRadius,
      bordered,
      color,
      height,
      opacity,
      placement,
      position,
      theme,
      zIndex,
    } = props;
    const { black, darkColor, darkMode, grayScale, white } = theme;

    const borderColor = darkMode ? grayScale['700'] : grayScale['200'];
    let selectedBg = darkMode ? darkColor : white;
    let selectedColor = darkMode ? white : black;

    if (bg) {
      const { mainColor, textColor } = getColorTokens(bg, color, theme);

      selectedBg = mainColor;
      selectedColor = textColor;
    }

    if (opacity) {
      selectedBg = opacify(selectedBg, opacity);
    }

    return css`
      background-color: ${selectedBg};
      bottom: ${placement === 'bottom' ? 0 : 'auto'};
      color: ${selectedColor};
      ${bordered && `border-bottom: 1px solid ${borderColor};`};
      ${blurred && `backdrop-filter: blur(${px(blurredRadius)});`};
      height: ${px(height)};
      position: ${placement === 'top' ? position : 'fixed'};
      transform: translateY(${props.isHidden ? '-100%' : 0});
      transition: transform 0.3s;
      top: ${placement === 'top' ? 0 : 'auto'};
      z-index: ${zIndex};
    `;
  },
);

const StyledHeader = styled('header', getStyledOptions())<
  SetRequired<NavBarProps, 'height' | 'maxWidth'> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  props => {
    const { height, maxWidth, theme } = props;
    const { spacing } = theme;

    return css`
      height: ${px(height)};
      max-width: ${px(maxWidth)};
      padding: 0 ${spacing.md};
    `;
  },
);

export const NavBar = forwardRef<HTMLElement, NavBarProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useNavBar(props);
  const {
    children,
    disableScrollHandler,
    hideOnScroll,
    menuDefaultOpen,
    menuOpen,
    onScrollPosition,
    onToggleMenu,
    parentRef,
    ...rest
  } = componentProps;
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(is.boolean(menuOpen) ? menuOpen : menuDefaultOpen);

  const localRef = useRef<HTMLButtonElement | null>(null);
  const mergedRefs = useMergeRefs(localRef, ref);
  const navHeight = useRef(0);

  useEffect(() => {
    navHeight.current = localRef.current?.offsetHeight ?? 0;
  }, []);

  useEffect(() => {
    if (is.boolean(menuOpen)) {
      setMenuOpen(menuOpen);
    }
  }, [menuOpen]);

  useScrollPosition({
    elementRef: parentRef,
    isEnabled: hideOnScroll || !disableScrollHandler,
    callback: ({ currPos, prevPos }) => {
      onScrollPosition?.(currPos.y);

      if (hideOnScroll) {
        setIsHidden(previous => {
          const next = currPos.y > prevPos.y && currPos.y > navHeight.current;

          return next !== previous ? next : previous;
        });
      }
    },
  });

  const [childrenWithoutMenu, [menu]] = splitReactChildren(children, NavBarMenu);

  const handleToggleMenu = useCallback(
    (isOpen: boolean) => {
      if (is.boolean(menuOpen)) {
        return;
      }

      setMenuOpen(isOpen);
      onToggleMenu?.(isOpen);
    },
    [menuOpen, onToggleMenu],
  );

  return (
    <StyledNavBar
      ref={mergedRefs}
      {...getDataAttributes('NavBar')}
      data-hidden={isHidden}
      isHidden={isHidden}
      {...rest}
    >
      <NavBarProvider
        props={{ ...omit(componentProps, 'children', 'theme'), isMenuOpen }}
        toggleMenu={handleToggleMenu}
      >
        <StyledHeader {...getDataAttributes('NavBarHeader')} {...rest}>
          {childrenWithoutMenu}
        </StyledHeader>
        {menu}
      </NavBarProvider>
    </StyledNavBar>
  );
});

NavBar.displayName = 'NavBar';

export { defaultProps, type NavBarProps } from './useNavBar';
