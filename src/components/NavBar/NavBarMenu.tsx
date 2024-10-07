import { useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { clamp, px } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { fade } from 'colorizr';
import disableScroll from 'disable-scroll';

import { useComponentProps } from '~/hooks/useComponentProps';

import { getSlideDownAnimation } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { Portal } from '~/components/Portal';

import { WithTheme } from '~/types';

import { NavBarMenuProps, NavBarProps, useNavBarContext } from './useNavBar';

const StyledNavBarMenu = styled('ul', getStyledOptions())<
  SetRequired<NavBarProps, 'blurred' | 'blurredOpacity' | 'disableAnimation' | 'height'> &
    WithTheme & { isMenuOpen: boolean; shouldAnimate: boolean }
>(
  {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  props => {
    const {
      bg,
      blurred,
      blurredOpacity,
      color,
      disableAnimation,
      height,
      isMenuOpen,
      shouldAnimate,
      theme,
    } = props;
    const { black, darkColor, darkMode, spacing, white } = theme;

    let animation;
    const totalHeight = `calc(100vh - ${px(height)})`;
    let selectedBg = darkMode ? darkColor : white;
    let selectedColor = darkMode ? white : black;

    if (bg) {
      const { mainColor, textColor } = getColorTokens(bg, color, theme);

      selectedBg = mainColor;
      selectedColor = textColor;
    }

    if (blurred) {
      selectedBg = fade(selectedBg, clamp(blurredOpacity * 100));
    }

    if (!disableAnimation && shouldAnimate) {
      animation = css`
        animation: ${getSlideDownAnimation(totalHeight)} 0.3s ease-in-out forwards
          ${isMenuOpen ? '' : ' reverse'};
      `;
    }

    return css`
      ${animation};
      background-color: ${selectedBg};
      ${blurred && `backdrop-filter: blur(8px);`};
      color: ${selectedColor};
      gap: ${spacing.xs};
      height: ${totalHeight};
      overflow-y: auto;
      padding: ${spacing.md};
      position: fixed;
      inset: 0;
      top: ${px(height)};
      z-index: 20;
    `;
  },
);

export function NavBarMenu(props: NavBarMenuProps) {
  const {
    componentProps: { children, theme },
    getDataAttributes,
  } = useComponentProps(props);
  const {
    state: { isMenuOpen, onScrollPosition, onToggleMenu, ...rest },
  } = useNavBarContext();
  const [{ shouldAnimate, shouldRender }, setState] = useSetState({
    shouldAnimate: isMenuOpen,
    shouldRender: isMenuOpen,
  });

  useEffect(() => {
    if (isMenuOpen) {
      setState({ shouldRender: true, shouldAnimate: true });
      disableScroll.on();
    } else {
      setState({ shouldAnimate: true });
      disableScroll.off();
    }
  }, [isMenuOpen, setState]);

  const handleAnimationEnd = () => {
    setState({ shouldRender: isMenuOpen, shouldAnimate: false });
  };

  return (
    <Portal disableAnimation hideOverlay isOpen={shouldRender} top={rest.height}>
      <StyledNavBarMenu
        {...getDataAttributes('NavBarMenu')}
        isMenuOpen={isMenuOpen}
        onAnimationEnd={handleAnimationEnd}
        shouldAnimate={shouldAnimate}
        theme={theme}
        {...rest}
      >
        {children}
      </StyledNavBarMenu>
    </Portal>
  );
}

NavBarMenu.displayName = 'NavBarMenu';
