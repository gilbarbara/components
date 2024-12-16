import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, pick, px } from '@gilbarbara/helpers';
import { useHasChanged, useSetState } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { opacify } from 'colorizr';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Portal } from '~/components/Portal/Portal';

import { WithTheme } from '~/types';

import { SidebarProps, useSidebar } from './useSidebar';

export const StyledSidebar = styled(
  'div',
  getStyledOptions(),
)<
  SetRequired<
    Omit<SidebarProps, 'isOpen' | 'onDismiss'>,
    'blurred' | 'blurredRadius' | 'disableAnimation' | 'opacity' | 'side'
  > &
    WithTheme & { isActive: boolean }
>(props => {
  const {
    animationEasing,
    animationEnterDuration,
    animationExitDuration,
    bg,
    blurred,
    blurredRadius,
    color,
    disableAnimation,
    isActive,
    opacity,
    origin,
    side,
    theme,
    width,
  } = props;
  const { black, darkColor, darkMode, white } = theme;
  const animationDuration = isActive ? animationExitDuration : animationEnterDuration;
  let selectedBg = darkMode ? darkColor : white;
  let selectedColor = darkMode ? white : black;
  let initialPosition = `translate3d(${side.startsWith('left') ? '-' : ''}100%, 0, 0)`;

  if (origin) {
    initialPosition = `translate3d(0, ${origin === 'top' ? '-' : ''}100%, 0)`;
  }

  if (bg) {
    const { mainColor, textColor } = getColorTokens(bg, color, theme);

    selectedBg = mainColor;
    selectedColor = textColor;
  }

  return css`
    background-color: ${opacify(selectedBg, opacity, 'rgb')};
    ${blurred && `backdrop-filter: blur(${px(blurredRadius)});`};
    bottom: 0;
    color: ${selectedColor};
    left: ${side.startsWith('left') ? 0 : 'auto'};
    overflow-y: auto;
    position: fixed;
    right: ${side.startsWith('right') ? 0 : 'auto'};
    transform: ${isActive ? 'translate3d(0, 0, 0)' : initialPosition};
    transition: ${disableAnimation ? 'none' : `transform ${animationDuration}s ${animationEasing}`};
    top: 0;
    width: ${px(width)};
    z-index: 20;
    ${getStyles(omit(props, 'opacity'), { skipColor: true })};
  `;
});

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { getDataAttributes, portalProps, sidebarProps } = useSidebar(props);
  const {
    animationEasing,
    animationEnterDuration,
    animationExitDuration,
    disableAnimation,
    isOpen,
  } = portalProps;
  const [{ isActive, isRendering }, setState] = useSetState({
    isActive: isOpen,
    isRendering: isOpen,
  });

  useHasChanged(isOpen, () => {
    if (isOpen) {
      setTimeout(
        () => {
          setState({ isActive: true, isRendering: true });
        },
        disableAnimation ? 0 : 100,
      );
    } else {
      setState({ isActive: false });

      setTimeout(
        () => {
          setState({ isRendering: false });
        },
        disableAnimation ? 0 : animationExitDuration * 1000,
      );
    }
  });

  return (
    <Portal
      {...portalProps}
      isOpen={isOpen || isActive || isRendering}
      {...pick(sidebarProps, 'bottom', 'left', 'right', 'top')}
    >
      <StyledSidebar
        ref={ref}
        {...getDataAttributes('Sidebar')}
        animationEasing={animationEasing}
        animationEnterDuration={animationEnterDuration}
        animationExitDuration={animationExitDuration}
        data-open={isOpen}
        disableAnimation={disableAnimation}
        isActive={isActive}
        {...sidebarProps}
      />
    </Portal>
  );
});

Sidebar.displayName = 'Sidebar';

export { defaultProps, type SidebarProps } from './useSidebar';
