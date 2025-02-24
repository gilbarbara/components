import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { useMount, usePrevious, useSetState, useUpdateEffect } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { opacify } from 'colorizr';

import { getColorTokens } from '~/modules/colors';
import { convertKebabCaseToCamelCase, getElement } from '~/modules/helpers';
import { positioningStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { createPortalElement, getPortalElement, PortalProps, usePortal } from './usePortal';

const StyledPortal = styled.div<
  Omit<PortalProps, 'children' | 'isOpen' | 'onDismiss'> & { isActive: boolean }
>(
  {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    visibility: 'hidden',
  },
  props => {
    const { isActive } = props;

    return css`
      opacity: ${isActive ? 1 : 0};
      visibility: ${isActive ? 'visible' : 'hidden'};
      ${positioningStyles(props)};
    `;
  },
);

const Overlay = styled.div<
  SetRequired<
    Omit<PortalProps, 'children' | 'isOpen' | 'onDismiss'>,
    'disableAnimation' | 'overlayBlur' | 'overlayBlurAmount' | 'overlayOpacity'
  > & { isActive: boolean } & WithTheme
>(props => {
  const {
    animationEasing,
    animationEnterDuration,
    animationExitDuration,
    bg,
    disableAnimation,
    isActive,
    overlayBlur,
    overlayBlurAmount,
    overlayOpacity,
    theme,
  } = props;
  const { black, darkMode, grayScale } = theme;

  const animationDuration = isActive ? animationEnterDuration : animationExitDuration;
  let selectedBg = darkMode ? grayScale['150'] : black;

  if (bg) {
    const { mainColor } = getColorTokens(bg, undefined, theme);

    selectedBg = mainColor;
  }

  if (selectedBg !== 'transparent') {
    selectedBg = opacify(selectedBg, overlayOpacity);
  }

  return css`
    background-color: ${selectedBg};
    ${overlayBlur && `backdrop-filter: blur(${px(overlayBlurAmount)});`};
    bottom: 0;
    left: 0;
    opacity: ${isActive ? 1 : 0};
    position: absolute;
    right: 0;
    top: 0;
    ${!disableAnimation && `transition: opacity ${animationDuration}s ${animationEasing};`};
  `;
});

const Content = styled.div<
  Pick<PortalProps, 'animationEasing' | 'animationEnterDuration' | 'animationExitDuration'> & {
    disableAnimation: boolean;
    isActive: boolean;
  }
>(props => {
  const {
    animationEasing,
    animationEnterDuration,
    animationExitDuration,
    disableAnimation,
    isActive,
  } = props;

  const animationDuration = isActive ? animationEnterDuration : animationExitDuration;

  return css`
    max-height: 100%;
    opacity: ${isActive ? 1 : 0};
    position: relative;
    ${!disableAnimation && `transition: opacity ${animationDuration}s ${animationEasing};`};
    width: auto;
    z-index: 10;
  `;
});

const CloseButton = styled(ButtonUnstyled)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

export function Portal(props: PortalProps) {
  const { componentProps, getDataAttributes } = usePortal(props);
  const {
    animationEasing,
    animationEnterDuration,
    animationExitDuration,
    children,
    container,
    disableAnimation,
    disableCloseOnClickOverlay,
    disableCloseOnEsc,
    hideOverlay,
    isOpen,
    onClose,
    onDismiss,
    onOpen,
    showCloseButton,
    theme,
    ...rest
  } = componentProps;
  const { dataAttributeName } = theme;

  const [{ isActive, isReady, isRendering }, setState] = useSetState({
    isActive: isOpen,
    isReady: false,
    isRendering: false,
  });
  const portal = useRef<Element | null>(null);

  const shouldRender = isOpen || isActive || isRendering;
  const previousIsOpen = usePrevious(isOpen);

  useMount(() => {
    let portalElement = getPortalElement();

    if (!getPortalElement()) {
      portalElement = createPortalElement();

      const target = getElement(container) ?? document.body;

      target.appendChild(portalElement);
    }

    portal.current = portalElement;
    setState({ isReady: true });
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableCloseOnEsc) {
        return;
      }

      if (event.code === 'Escape') {
        event.stopPropagation();

        onDismiss();
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [disableCloseOnEsc, isActive, onDismiss]);

  const openPortal = useCallback(() => {
    setState({ isActive: true, isRendering: true });

    setTimeout(
      () => {
        onOpen?.();
      },
      disableAnimation ? 0 : (animationEnterDuration + 0.1) * 1000,
    );
  }, [animationEnterDuration, disableAnimation, onOpen, setState]);

  const closePortal = useCallback(() => {
    setState({ isActive: false });

    setTimeout(
      () => {
        setState({ isRendering: false });
        onClose?.();
      },
      disableAnimation ? 0 : (animationExitDuration + 0.2) * 1000,
    );
  }, [animationExitDuration, disableAnimation, onClose, setState]);

  useUpdateEffect(() => {
    const hasChanged = previousIsOpen !== isOpen;

    if (!hasChanged) {
      return;
    }

    if (isOpen) {
      openPortal();
    } else if (!isOpen && isActive) {
      closePortal();
    }
  }, [closePortal, disableCloseOnEsc, isActive, isOpen, openPortal, previousIsOpen, setState]);

  const handleClickClose = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const { dataset } = event.currentTarget;

      if (
        dataset[convertKebabCaseToCamelCase(dataAttributeName)] === 'PortalOverlay' &&
        disableCloseOnClickOverlay
      ) {
        return;
      }

      onDismiss();
    },
    [dataAttributeName, disableCloseOnClickOverlay, onDismiss],
  );

  if (!isReady || !portal.current) {
    return null;
  }

  const content: Record<string, ReactNode> = {};

  if (shouldRender) {
    content.main = (
      <Content
        {...getDataAttributes('PortalContent')}
        animationEasing={animationEasing}
        animationEnterDuration={animationEnterDuration}
        animationExitDuration={animationExitDuration}
        disableAnimation={disableAnimation}
        isActive={isActive}
      >
        {children}
      </Content>
    );

    if (!hideOverlay) {
      content.overlay = (
        <Overlay
          {...getDataAttributes('PortalOverlay')}
          animationEasing={animationEasing}
          animationEnterDuration={animationEnterDuration}
          animationExitDuration={animationExitDuration}
          disableAnimation={disableAnimation}
          isActive={isActive}
          onClick={handleClickClose}
          theme={theme}
          {...rest}
        />
      );
    }

    if (showCloseButton) {
      content.closeButton = (
        <CloseButton
          {...getDataAttributes('PortalCloseButton')}
          onClick={handleClickClose}
          p="xs"
          radius="round"
          title="Close"
        >
          <Icon name="close-o" size={24} title="Close" />
        </CloseButton>
      );
    }
  }

  return createPortal(
    <StyledPortal
      {...getDataAttributes('Portal')}
      data-open={isOpen}
      isActive={shouldRender}
      {...rest}
    >
      {content.overlay}
      {content.closeButton}
      {content.main}
    </StyledPortal>,
    portal.current,
  );
}

Portal.displayName = 'Portal';

export { defaultProps, type PortalProps } from './usePortal';
